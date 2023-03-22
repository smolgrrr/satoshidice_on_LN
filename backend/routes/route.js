const router = require('express').Router();
const lnService = require("ln-service");
const provably = require('../provably_fair/index');
const lnurlServer = require('../helpers/lnurl');
const admin = require("firebase-admin");


//Firestore
var serviceAccount = require("../serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

require("dotenv").config();

//LND
const { lnd } = lnService.authenticatedLndGrpc({
    macaroon: process.env.LND_MACAROON,
    socket: process.env.LND_ADDRESS,
});

lnService.getIdentity({ lnd }, (error, result) => {
  console.log(error);
  console.log(result);
});

router.get('/getServerHash', async (req, res) => {
  db.collection('seed').orderBy("date", "desc").limit(1).get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log("No documents found");
      return;
    }
    snapshot.forEach(doc => {
      const snapshotRefData = doc.data();
      res.json({serverHash: snapshotRefData.hash})
    });
  })
  .catch(err => {
    console.log("Error getting documents", err);
  });

});

router.get('/getBets', async (req, res) => {
  try {
    const betData = [];
    db.collection('bets')
      .orderBy("date", "desc").limit(50).get()
      .then(snapshot => {
        snapshot.forEach((doc) => {
          const snapshotRefData = doc.data();
          betData.push({
            amount: snapshotRefData.amount, 
            date: snapshotRefData.date,
            slide: snapshotRefData.slide,
            luckyNumber: snapshotRefData.luckyNumber
          });
        });
        res.json(betData);
      })
      .catch(err => {
        res.json(err);
      });
  } catch (err) {
    res.json(err);
  }
});

router.post('/addInvoice', async (req, res) => {
  const tag = 'payRequest';
  const params = {
    minSendable: 100000,
    maxSendable: 100000,
    metadata: '[["text/plain", "lnurl-node"]]',
    commentAllowed: 500,
  };

  //maxSendable filter
  let maxSendable = 200000;
  switch (true) {
    case (req.body.slide < 2):
      maxSendable = 1000;
      break;
    case (req.body.slide < 5):
      maxSendable = 2500;
      break;
    case (req.body.slide < 10):
      maxSendable = 10000;
      break;
    case (req.body.slide < 20):
      maxSendable = 20000;
      break;
    case (req.body.slide < 40):
      maxSendable = 50000;
      break;
    case (req.body.slide < 70):
      maxSendable = 100000;
      break;
    case (req.body.slide < 99):
      maxSendable = 250000;
      break;
    default:
      break;
  }
  params.maxSendable = maxSendable * 1000;
  params.metadata = '[["text/plain", "Bet amount- Max:' + maxSendable + ' Min: '+ params.minSendable/1000 +'"]]';

  const options = {
    uses: 1,
  };
  lnurlServer.generateNewUrl(tag, params, options).then(result => {
    const { encoded, secret, url } = result;
    res.json({ encoded, secret, url  });
  }).catch(error => {
    res.json(error);
  });

});

router.post("/checkInvoice", async (req, res) => {
  try {
    var checkInvoice = await lnService.getInvoice({
      lnd,
      id: req.body.id
    });
    res.json(checkInvoice.is_confirmed);
    if (checkInvoice.is_confirmed) {
      try {
        await db.collection('bets').doc().set({
          date: checkInvoice.created_at,
          amount: checkInvoice.received,
          slide: req.body.slide,
          payment_id: checkInvoice.id,
          withdraw_status: false
          });
      } catch (error) {
        res.json(error);
      }
    }
  } catch (err) {
    res.json(err);
  }
});

router.post('/luckyNumber', async (req, res) => {
  let amount, withdraw_status, slide;
   try {
    //Check with db
    const invoiceRef = db.collection('bets').where('payment_id', '==', req.body.id);
    const invoiceRefSnapshot = await invoiceRef.get();
    invoiceRefSnapshot.docs.forEach((doc) => {
      const invoiceRefData = doc.data();
      slide = invoiceRefData.slide;
      amount = invoiceRefData.amount;
      withdraw_status = invoiceRefData.withdraw_status;
    });

    if (withdraw_status) {
      return res.status(400).send({ error: 'Invalid withdraw request' });
    }

    } catch (err) {
      res.json(err);
    }
  
  if (slide <= 0 || slide >= 100) {
    return res.status(400).send({ error: 'Slide must be between 0 and 99' });
  }
  if (amount >= 500000 ) {
    return res.status(400).send({ error: 'Above maximum bet' });
  }
  
  var luckyNumber = await provably.combinationSeed(
    req.body.serverSeed,
    req.body.id,
    req.body.nonce
  );

  var winAmount = amount * (95 / slide).toFixed(2) * 1000;
  if (luckyNumber <= slide) {
    const tag = 'withdrawRequest';
    const params = {
      minWithdrawable: Math.floor(winAmount),
      maxWithdrawable: Math.floor(winAmount),
      defaultDescription: 'You win!',
    };
    const options = {
      uses: 1,
    };
    lnurlServer.generateNewUrl(tag, params, options).then(result => {
      const { encoded } = result;
      //Update db
      db.collection('bets').where('payment_id', '==', req.body.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.update({ 
            withdraw_status: true,
            luckyNumber: luckyNumber,
          });
        });
      })
      .catch(error => {
        console.error('Error updating document: ', error);
      });

      return res.json({ encoded, luckyNumber, userHash: req.body.id });
    }).catch(error => {
      console.error(error);
    });
  } else {
    //Update db
    db.collection('bets').where('payment_id', '==', req.body.id)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.update({ 
          luckyNumber: luckyNumber,
        });
      });
    })

    return res.json({
      luckyNumber, userHash: req.body.id
    });
  }
});

module.exports = router;

import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { Form, Button } from 'antd';
import axios from 'axios';
import JSConfetti from 'js-confetti'

import './Game.css';

export default function Game() {
  const [slide, setSlide] = useState(0);
  const [nonce, setNonce] = useState(0);
  const [serverHash, setServerHash] = useState('');
  const [luckyNumber, setLuckyNumber] = useState('Awaiting first bet');
  const [LNURLw, setLNURLw] = useState('');
  const [spinner, setSpinner] = useState(false);
  const [userHash, setUserHash] = useState('Awaiting first bet');
  const [betsData, setBetsData] = useState([]);

  let paymentActive = false;

  useEffect(() => {
    async function getserverHash() {
      axios.get('http://localhost:4000/getServerHash').then(res => {
        setServerHash(res.data.serverHash);
      });
    }

    // enable() 
    getserverHash();
  }, []);

  function celebrate(outcome) {
    const jsConfetti = new JSConfetti();
    if (outcome) {
    jsConfetti.addConfetti({ emojis: ["⚡"] });
    } else {
    jsConfetti.addConfetti({ emojis: ["💩"] });
    }
  }

  function getLuckyNumber(paymentHash) {
    axios
      .post('http://localhost:4000/luckyNumber', {
        nonce: nonce,
        id: paymentHash,
        slide: slide
      })
      .then(async res => {
        setLuckyNumber(res.data.luckyNumber);
        setUserHash(res.data.userHash);
          if (res.data.luckyNumber < slide) {
            celebrate(true)
            setLNURLw(res.data.encoded)
            await window.webln.lnurl(res.data.encoded);
          } else {
            celebrate(false)
          }
      });
  }

  let invoice;
  function addInvoice() {
    axios
      .post('http://localhost:4000/addInvoice', {
        slide: slide
      })
      .then(async res => {
        await window.webln.enable();

        invoice = await window.webln.lnurl(res.data.encoded);
        paymentActive = true;
        setSpinner(true);
        startPollingPayment(invoice.paymentHash, 1000);
      });
  }

  async function isPaid(hex_id) {
    axios
      .post(' http://localhost:4000/checkInvoice', {
        id: hex_id,
        slide: slide
      })
      .then(async res => {
        if (res.data) {
          result = true;
        }
        return res.data;
      });
  }

  let result = false;
  function startPollingPayment(payment_hash, timeout) {
    if (!paymentActive) return;

    setTimeout(async function () {
      await isPaid(payment_hash);

      console.log("Polling results: " + result)
      if (result) {
        getLuckyNumber(payment_hash);
        setNonce(nonce + 1);
        paymentActive = false;
        setSpinner(false);
        console.log("paid");
      } else {
        startPollingPayment(payment_hash, timeout);
      }
    }, timeout);
  }

  useEffect(() => {
    if (slide !== 0) {
      addInvoice();
    }
  }, [slide]);

  useEffect(() => {
    async function fetchBets() {
      try {
        const response = await axios.get('http://localhost:4000/getBets');
        const data = response.data;
        // use the data to populate the table
        setBetsData(data.filter((_, i) => i % 2 === 0));
      } catch (error) {
        console.error(error);
      }
    }
    fetchBets();
  }, []);

  return (
    <div className='width-container box'>
      <Form>
        <Form.Item>
          <Row>
            <Col className='DiceCSS' span={8}>
                <h5 ><font color="ce9017">LNSatoshiDice is a Bitcoin betting game.</font> Win up to 95x your bet, instantly. All rolls are verifiable.</h5>

                <h3 size="2"><font color="ce9017">How To Play</font></h3>
                <p>
                  <strong><font color="ce9017">Step 1</font></strong>  Send sats to the LNURLp generated after pressing the bet button (must be between the max and min).<br />

                  <br />
                  <strong><font color="ce9017">Step 2</font></strong>  The Ghost of Satoshi will roll the dice and pick a Lucky Number!<br />

                  <br />
                  <strong><font color="ce9017">Step 3</font></strong>  You win if the Lucky Number is less than the number you chose.<br />
                  <br />

                  You should see a LNURLw back within seconds with your bet multiplied by the prize otherwise you lost.<strong><font color="ce9017"> Best Bitcoin game ever!</font></strong><br /><br />
                  <font size="1">Need to buy Bitcoins? Use <a href="https://honeyroad.store/convert" target="_blank" rel="noopener noreferrer">honeyroad.store/convert</a>
                </font></p>
                </Col>
                <Col className='DiceCSS' span={8}>
              <center>
                <a><img src="./SatoshiDice Bitcoin Casino Game_files/VgiOY.png" alt="English" width="32" height="32" border="0" /></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/6tB0X.png" longdesc="English" border="0" /></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/AzrmQ.png" alt="Chinese" width="32" height="32" border="0"/></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/k5UjQ.png" longdesc="Spanish" border="0"/></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/JStH7.png" longdesc="Spanish" border="0"/></a><br /><a ><img src="./SatoshiDice Bitcoin Casino Game_files/J82aV.png" longdesc="Swedish" border="0"/></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/YABjE.png" longdesc="German" border="0"/></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/73IrU.png" longdesc="French" border="0"/></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/7gaSX.png" longdesc="Portuguese" border="0"/></a>&nbsp;<a><img src="./SatoshiDice Bitcoin Casino Game_files/Q6AxC.png" longdesc="Portuguese" border="0"/></a></center>
              <br />
              <div align="center"><img src="./SatoshiDice Bitcoin Casino Game_files/logo.png" width="235" height="154" alt="SatoshiDice Bitcoin Betting Casino Game" /></div><br />
              <br />

              <center>
                <table width="100%" border="0" cellspacing="0">  
                  <tbody><tr>
                    <td width="70%"> <center> <a href="https://twitter.com/smolgrrr" target="_blank" rel="noopener noreferrer"><img src="./SatoshiDice Bitcoin Casino Game_files/DHwAL.png" alt="Twitter" border="0" /></a></center></td>
                    <td width="30%" align="right">

                    </td>
                  </tr>
                  </tbody></table>
              </center>
                </Col>
                <Col className='DiceCSS' span={8}>
                <h3><font color="ce9017">Verification</font></h3>

                <li><a href="/bits">How it Works</a></li>
                <li><a href="/secrets">Secret Keys and Numbers</a></li>

                <br />

                <font color="ce9017">WARNING:</font> Only use wallets that accept LNURL. If you're not sure, test with 100 sats. If you get nothing back, then your wallet is not compatible.
                <br /><br />
                <h5><a href="#Bet">Bet</a> | <a href="#Recent">Recent Bets</a> </h5>
                <h6>
                  <u>Also visit our partner</u>
                  <br /><br />
                  <a><img src="./SatoshiDice Bitcoin Casino Game_files/bitlotto_logo_sm.png" alt="BitLotto" width="97" height="24" border="0"/></a>
                  <br />
                  To enter the next BitLotto drawing, send any multiple of 0.25 BTC to (warning above applies):<br />
                  <strong>1Bdon'tusethisaddressn1KfXDf
                    June 1 2012</strong>
                  <br />Current Jackpot: 37.72 BTC</h6>
                </Col>
              </Row>
              <Row>
                {spinner === true ? (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : null}
              <div style={{margin: 'auto', width: '500px', wordWrap: 'break-word'}}>
                {LNURLw !== '' && <span>Click to withdraw: <a href={"lightning:"+LNURLw}>{LNURLw}</a></span>}
              </div>
              </Row>
              <Row>
              <table border="0" width="80%" cellspacing="0" class="data">
<thead>

<tr class="odd"><th class=""><font color="#ffffff">Name</font></th>
<th class=""><font color="#ffffff">Win Odds</font></th>
<th class=""><font color="#ffffff">Prize Multiplier</font></th>
<th class=""><font color="#ffffff">House Percent</font></th>
<th class=""><font color="#ffffff">Expected Return</font></th>
<th class=""><font color="#ffffff">Min Bet (<i class="fak fa-satoshisymbol-outline"></i>)</font></th>
<th class=""><font color="#ffffff">Max Bet (<i class="fak fa-satoshisymbol-outline"></i>)</font></th>
<th class=""><font color="#ffffff">Place Bet</font></th>

</tr></thead>
<tbody><tr class="even"><td class="">lessthan     1</td><td align="right" class="">1%</td><td align="right" class="">95x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class=""><i class="fak fa-light"/>100</td><td align="right" class=""><i class="fak fa-light"/>1k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(1)}}>Bet</Button></td></tr>
<tr class="odd"><td class="">lessthan     2</td><td align="right" class="">2%</td><td align="right" class="">47.50x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class="">100</td><td align="right" class="">2.5k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(2)}}>Bet</Button></td></tr>
<tr class="even"><td class="">lessthan     4</td><td align="right" class="">4%</td><td align="right" class="">23.75x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class="">100</td><td align="right" class="">2.5k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(4)}}>Bet</Button></td></tr>
<tr class="odd"><td class="">lessthan     8</td><td align="right" class="">8%</td><td align="right" class="">11.88x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class="">100</td><td align="right" class="">10k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(8)}}>Bet</Button></td></tr>
<tr class="even"><td class="">lessthan    16</td><td align="right" class="">16%</td><td align="right" class="">5.94x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class="">100</td><td align="right" class="">20k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(16)}}>Bet</Button></td></tr>
<tr class="odd"><td>lessthan    32</td><td align="right" class="">32%</td><td align="right" class="">2.97x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class="">100</td><td align="right" class="">50k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(32)}}>Bet</Button></td></tr>
<tr class="even"><td class="">lessthan    64</td><td align="right" class="">64%</td><td align="right" class="">1.48x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class="">100</td><td align="right" class="">100k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(64)}}>Bet</Button></td></tr>
<tr class="odd"><td>lessthan    90</td><td align="right" class="">90%</td><td align="right" class="">1.06x</td><td align="right" class="">5.000%</td><td align="right" class="">95.000%</td><td align="right" class=""><i class="fak fa-light"/>100</td><td align="right" class=""><i class="fak fa-light"/>250k</td> <td><Button type='primary' size={"small"} onClick={() => {setSlide(90)}}>Bet</Button></td></tr>
</tbody></table>
              </Row>
            </Form.Item>
            <Form.Item>
            <div style={{maxWidth: '55%', margin: 'auto'}}>
              <div>
                <strong><font color="ce9017">Lucky Number</font></strong>
              </div>
              <div className='selector'>{luckyNumber}</div>
              <div>
                <strong><font color="ce9017">Server Hash</font></strong>
              </div>
              <div className='selector'>{serverHash}</div>

              <div>
                <strong><font color="ce9017">Last Payment Hash</font></strong>
              </div>
              <div>{userHash}</div>
            </div>
            <Row>
                  <br />
               <h3><a name="Recent">Recent Bets</a></h3>
              <table border="0" width="70%" cellspacing="0" className="data">
                <thead>
                  <tr className="odd">
                    <th>Date</th>
                    <th>Bet</th>
                    <th>Bet Amount</th>
                    <th>Result</th>
                    <th>Lucky Number</th>
                  </tr>
                </thead>
                <tbody>
                  {betsData.map((bet, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                      <td>
                        {new Date(bet.date).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          second: 'numeric'
                        })}
                      </td>
                      <td>lessthan {bet.slide}</td>
                      <td><i class="fak fa-light"/>{bet.amount}</td>
                      <td>{bet.luckyNumber <= bet.slide ? ('WIN') : ('LOSE') }</td>
                      <td>{bet.luckyNumber && bet.luckyNumber.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
            </Form.Item>
            <div>
            <center className="DiceCSS" style={{textAlign: "center"}}>LNSatoshiDice Bitcoin Game - Bet Bitcoins with LNSatoshiDice Bitcoin gambling. Follow <a href="https://twitter.com/smolgrrr" target="_new">@Smolgrrr</a> on Twitter</center>
            </div>
          </Form>
        </div>
        );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Secret.css';

export default function Secret() {
  const [clientSeed, setClientSeed] = useState("");
  const [serverSeed, setServerSeed] = useState("");
  const [rollResult, setRollResult] = useState("");

  useEffect(() => {
    setRollResult("");
  }, [clientSeed, serverSeed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:4000/verify", {
      id: clientSeed,
      serverSeed: serverSeed,
    });
    setRollResult(result.data);
  };

  return (
    <div className='box side DiceCSS'>
      <font size="2">
        <h1>Secret Keys</h1>
        <p>In order to ensure that there is no way for the system to change the outcome of a bet, the secret keys  used in the hash are
          decided ahead of time.  They are not released right away, since they could be used to submit selective transactions and
          win bets unfairly.  However, the hash of the secret is shown.</p>

        <h2>Days</h2>
        <p>Each bet transaction that comes in is assigned to the secret key of the current day when it is first processed.  In most cases this will be as soon as the transaction is broadcast on the lightning network.  However it could be later if the system has some problems processing or  an outage.  All times are in GMT.</p>

        <h2>Secrets</h2>
        <p>So that is all well and good for the hashes but those are just hashes, not the actual secrets used.  After a day has been over for at least 24 hours the system will release the secret used.  Then you can verify that the hash of the secret matches the published hash in the hash file.  This demonstrates that the system used the secret it promised it would use.</p>
        <p>You can find all past secrets in this thread here or here</p>

        <h2>Lucky Number</h2>
        <p>The lucky number used to determine the winner of games is simple. See the below, and for further explanations see <a href="https://medium.com/@alexcambose/provably-fair-system-in-javascript-6457e028d2aa">here</a></p>

        <img src="./SatoshiDice Bitcoin Casino Game_files/luckyNumber.png" width="750" longdesc="SatoshiDice Bitcoin Betting Casino Game" />
        <br />
        <span slot="title">Verify</span>
        <form id="verify-bet-form" onSubmit={handleSubmit} style={{padding: "1em"}}>
          <div class="row">
            <div class="six columns">
              <label for="verify-client-seed-input">Payment ID Hash</label>
              <input
                required
                class="u-full-width"
                type="text"
                id="verify-client-seed-input"
                value={clientSeed}
                onChange={(e) => setClientSeed(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label for="verify-server-seed-input" >Server seed</label>
            <input
              required
              class="u-full-width"
              type="text"
              id="verify-server-seed-input"
              value={serverSeed}
              onChange={(e) => setServerSeed(e.target.value)}
            />
          </div>
          <button type="submit" class="button-primary u-full-width">
            Verify roll
          </button>
          {rollResult && (
            <div id="verifyRollResultsContainer">
              <p>Roll Result: {rollResult.toFixed(2)}</p>
            </div>
          )}
        </form>
        <br />
        <center>SatoshiDice Bitcoin Game - Bet Bitcoins with SatoshiDice Bitcoin gambling. Follow <a href="https://web.archive.org/web/20120508044510/https://twitter.com/#!/satoshidice" target="_new">@SatoshiDice</a> on Twitter
        </center>
      </font>
    </div>
  );
}
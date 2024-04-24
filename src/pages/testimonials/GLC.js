// GLC.js

import React, { useState, useEffect } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import glc from '../../images/glc.png';

function GLC() {
  const [bothHandsRaised, setBothHandsRaised] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    const host = "cpsc484-02.stdusr.yale.internal:8888";

    const startFrames = () => {
      const url = "ws://" + host + "/frames";
      const socket = new WebSocket(url);
      socket.onmessage = function (event) {
        const frame = JSON.parse(event.data);
        if (frame && frame["people"][0]) {
          checkHands(frame);
        }
      }
    };

    startFrames();

    return () => {
      // Clean up WebSocket connection if needed
    };
  });

  const checkHands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;

      if (left < head && right < head) {
        setBothHandsRaised(true);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }
      } else {
        setBothHandsRaised(false);
        if (countdownStarted) {
          setCountdownStarted(false);
        }
      }
    }
  };
  return (
    <Layout>
      <div>
        <div>
          <h2>Hear what other students think!</h2>
          <h1 style={{ textAlign: 'left ' }}>The Good Life Center</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <TextBox text="I go to all of the Good Life Center events because they help center my student life on campus. I really love going to yoga every week, and even the dance sessions sometimes."></TextBox>
            <TextBox text="I spend a lot of time here, especially in the Nap Room. Even when I'm stressed about never-ending midterms, GLC always has a really calm vibe."></TextBox>
            <TextBox text="The sandbox at the Good Life Center is super calming. 100% recommend just for that."></TextBox>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '60px', marginTop: '-30px' }}>
          <p style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '0px' }}>visit the website!</p>
            <img class="img-qr" src={glc} alt="good life center qr code" style={{ marginTop: '10px', marginLeft: '0px', marginRight: '0px' }}></img>
            
            <p style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '0px' }}>raise both hands to</p>
            <div className="button-container">
              <SmallButton text="start over" isHandRaised={bothHandsRaised} />
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'Sora', position: 'absolute', top: '50px', right: '100px' }}>
        {bothHandsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/" />} </div>
      </div>
    </Layout>

  );
}

export default GLC;
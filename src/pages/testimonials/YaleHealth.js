// YaleHealth.js

import React, { useState, useEffect } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import yaleHealth from '../../images/yale-health.png';

function YaleHealth() {
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
          <h1 style={{ textAlign: 'left ' }}>Yale Health Mental Health and Counseling</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <TextBox text="My therapist is so helpful! They taught me new things I didn't even realize about myself and my mental health has improved a lot since I started seeing them."></TextBox>
            <TextBox text="My provider was able to diagnose my mental health issues and has been teaching me helpful coping strategies. It took me a long time to be paired with them, but it was definitely worth waiting for."></TextBox>
            <TextBox text="I waited very long before I got to see a therapist, and even longer to see a psychiatrist and receive medication. If you have urgent mental health issues, you might need to start somewhere else."></TextBox>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '60px', marginTop: '-30px' }}>
          <p style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '0px' }}>visit the website!</p>
            <img class="img-qr" src={yaleHealth} alt="yale health qr code" style={{ marginTop: '10px', marginLeft: '0px', marginRight: '0px' }}></img>
            
            <p style={{ fontSize: '24px', color: 'white', textAlign: 'center', marginBottom: '0px' }}>raise both hands to</p>
            <div className="button-container">
              <SmallButton text="start over" isHandRaised={bothHandsRaised} />
            </div>
          </div>
        </div>
        <div style={{ fontFamily: 'Sora', position: 'absolute', top: '50px', right: '100px' }}>
        {bothHandsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/" />}</div>
      </div>
    </Layout>
  );
}

export default YaleHealth;
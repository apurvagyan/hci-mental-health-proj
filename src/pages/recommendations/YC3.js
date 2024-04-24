// YC3.js

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import { SmallButton } from '../../components/Components';
import HandRaisedChecker from '../HandRaised';
import yc3 from '../../images/yc3.png'

function YC3() {
  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [isRightHandRaised, setIsRightHandRaised] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    // set up host for becton center tv
    const host = "cpsc484-02.stdusr.yale.internal:8888";

    // call start method to run frames
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
  }); // Empty dependency array to ensure this effect runs only once

  const checkHands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;

      if (left < head && right > head) {
        setIsLeftHandRaised(true);
        setIsRightHandRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }

      }
      else if (right < head && left > head) {
        setIsRightHandRaised(true);
        setIsLeftHandRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }
      }
      else {
        // Reset both hand states if neither hand is raised
        setIsLeftHandRaised(false);
        setIsRightHandRaised(false);
        if (countdownStarted) {
          setCountdownStarted(false);
        }
      }
    }
  };
  return (
    <Layout>
      <div>
        <h2>We recommend:</h2>
        <h1 style={{ textAlign: 'left' }}>Yale College Community Care (YC3)</h1>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <p style={{ marginTop: '50px', marginRight: '100px' }}>(203) 432-0290
            <br />8:30am - 5pm
          </p>
          <div style={{ textAlign: 'right', marginTop: '0px' }}>
            <img class="img-qr" src={yc3} alt="yc3 qr code"></img>
          </div>
        </div>

        <p style={{ fontSize: '24px', color: 'white' }}>use your <i><b>left or right hand </b>to select</i></p>
        <div style={{ fontFamily: 'Sora', position: 'absolute', top: '50px', right: '100px' }}>
        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/CentralizedResources" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/YC3Testimonials" />}
        </div>
        <div class="button-container">
          <SmallButton text="explore other options" isHandRaised={isLeftHandRaised} />
          <SmallButton text="see what others think" isHandRaised={isRightHandRaised} />
        </div>
      </div>
    </Layout>
  );
}

export default YC3;
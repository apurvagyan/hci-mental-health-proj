// GLC.js

import React, { useState, useEffect } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import glc from '../../images/glc.png';

function GLC() {
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
          <img class="img-qr" src={glc} alt="good life center qr code" style={{ marginRight: '0px' }}></img>
        </div>
        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/CentralizedResources" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q1" />}
        <div class="button-container">
          <SmallButton text="explore other options" isHandRaised={isLeftHandRaised} />
          <SmallButton text="start over" isHandRaised={isRightHandRaised} />
        </div>
      </div>
    </Layout>

  );
}

export default GLC;
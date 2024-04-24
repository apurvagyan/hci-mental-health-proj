// YC3.js

import React, { useState, useEffect } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import yc3 from '../../images/yale-health.png';

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
        <div>
          <h2>Hear what other students think!</h2>
          <h1 style={{ textAlign: 'left ' }}>Yale College Community Care (YC3)</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <TextBox text="I think that YC3 is convenient because it's so easy to schedule an appointment whenever you need one. They helped me develop solid stress and time management strategies that I use everyday."></TextBox>
            <TextBox text="YC3 provided me with a lot of different resources when I was going through a difficult time during the semester. My counselor was really receptive."></TextBox>
            <TextBox text="Sometimes the counselors are unequipped to deal with your mental health struggles. When I went, they actually worsened my stress and I thought they were somewhat dismissive of my feelings."></TextBox>
          </div>
          <img class="img-qr" src={yc3} alt="yc3 qr code" style={{ marginRight: '0px' }}></img>
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

export default YC3;
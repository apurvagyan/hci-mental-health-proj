// Q1.js
import React, { useEffect, useState} from 'react';
import HandRaisedChecker from '../HandRaised';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Button';

import mentalHealthIcon from '../../images/mental-health-icon.png';
import wellnessIcon from '../../images/wellness-resources.png';

function Q1() {
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
  }, []); // Empty dependency array to ensure this effect runs only once

  const checkHands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;
      
      if (left < head) {
        setIsLeftHandRaised(true);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }

      } 
      else if (right < head)
      {
        setIsRightHandRaised(true);
        if (!countdownStarted) 
        {
          setCountdownStarted(true);
        }
      }
      else 
      {
        // Reset both hand states if neither hand is raised
        setIsLeftHandRaised(false);
        setIsRightHandRaised(false);
        if (countdownStarted) 
        {
          setCountdownStarted(false);
        }
    }
    }
  };

  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i am looking for... </h1>
        <div class="container">
          <LargeButton img={mentalHealthIcon} 
                       alt="person's head with brain" 
                       text="mental health resources"
                       isHandRaised={isLeftHandRaised}
                      ></LargeButton>
          <div class="divider"></div>
          <LargeButton img={wellnessIcon} alt="person's head with lotus flower" text="wellness resources" isHandRaised={isRightHandRaised}></LargeButton>
        </div>
        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q2" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q2" />}
    </Layout>
  );
}

export default Q1;


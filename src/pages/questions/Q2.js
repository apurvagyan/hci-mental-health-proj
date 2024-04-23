import React, { useEffect, useState } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout';
import { LargeButton } from '../../components/Button';
import sunbathing from '../../images/sunbathing.png';
import doctor from '../../images/doctor.png';

function Q2({ setAnswer }) {
  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [isRightHandRaised, setIsRightHandRaised] = useState(false);
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
          setAnswer('0'); // Record response as 0 when left hand is raised
        }
      } 
      else if (right < head) {
        setIsRightHandRaised(true);
        if (!countdownStarted) {
          setCountdownStarted(true);
          setAnswer('1'); // Record response as 1 when right hand is raised
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
      <h1 style={{ marginBottom: '-100px' }}>I would prefer a...</h1>
      <div className="container">
        <LargeButton
          img={sunbathing}
          alt="person laying on chair with knees up under the sun"
          text="casual environment"
          isHandRaised={isLeftHandRaised}
        />
        <div className="divider"></div>
        <LargeButton
          img={doctor}
          alt="person with stethoscope around their shoulders wearing lab coat"
          text="formal environment"
          isHandRaised={isRightHandRaised}
        />
      </div>
      {isLeftHandRaised && (
        <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q3" />
      )}
      {isRightHandRaised && (
        <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q3" />
      )}
    </Layout>
  );
}

export default Q2;

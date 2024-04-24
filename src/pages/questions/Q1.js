import React, { useEffect, useState } from 'react';
import HandRaisedChecker from '../HandRaised';

import Layout from '../../components/Layout'

import mentalHealthIcon from '../../images/mental-health-icon.png';
import wellnessIcon from '../../images/wellness-resources.png';
import { SmallButton, LargeButton } from '../../components/Components';


const response1 = {
  value: ''
};

function Q1({ setAnswer }) {

  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [bothHandsRaised, setBothHandsRaised] = useState(false);
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
        if (frame) {
          // Find the person closest to the screen
          const closestPerson = findClosestPerson(frame.people);
          if (closestPerson) {
            checkHands(closestPerson);
          }
        }
      }
    };

    startFrames();

    return () => {
      // Clean up WebSocket connection if needed
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  const findClosestPerson = (people) => {
    let closestPerson = null;
    let closestDepth = Infinity;

    for (const person of people) {
      // Assuming hip joint represents the depth
      const hipDepth = person.joints[0].position.z;
      if (hipDepth < closestDepth) {
        closestDepth = hipDepth;
        closestPerson = person;
      }
    }

    return closestPerson;
  };

  const checkHands = (person) => {
    if (person) {
      const head = person.joints[26].position.y;;
      const left = person.joints[8].position.y;
      const right = person.joints[15].position.y;

      if (left < head && right < head) {
        setBothHandsRaised(true);
        setIsLeftHandRaised(false);
        setIsRightHandRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }
      }
      else if (left < head && right > head) {
        setIsLeftHandRaised(true);
        setIsRightHandRaised(false);
        setBothHandsRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
          setAnswer('0');
        }
      }
      else if (right < head && left > head) {
        setIsRightHandRaised(true);
        setIsLeftHandRaised(false);
        setBothHandsRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
          setAnswer('1');
        }
      }
      else {
        // Reset both hand states if neither hand is raised
        setIsLeftHandRaised(false);
        setIsRightHandRaised(false);
        setBothHandsRaised(false);
        if (countdownStarted) {
          setCountdownStarted(false);
        }
      }
    }
  };

  return (
    <Layout>
      <h1 style={{ marginTop: '20px', marginBottom: '-100px' }}>i am looking for... </h1>
      <div class="container">
        <LargeButton img={mentalHealthIcon}
          alt="person's head with brain"
          text="mental health resources"
          isHandRaised={isLeftHandRaised}
        ></LargeButton>
        <div class="divider"></div>
        <LargeButton img={wellnessIcon} alt="person's head with lotus flower" text="wellness resources" isHandRaised={isRightHandRaised}></LargeButton>
      </div>
      <div style={{ marginTop: '-140px' }}>
        <p style={{ fontSize: '20px', color: 'white', marginBottom: '10px' }}>raise both hands to...</p>
        <SmallButton text="go back" isHandRaised={bothHandsRaised}></SmallButton>
      </div>
      {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q2" />}
      {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q2" />}
      {bothHandsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/instructions" />}
    </Layout>
  );
}

export { response1 };

export default Q1;

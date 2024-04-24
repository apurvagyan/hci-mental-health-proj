import React, { useEffect, useState } from 'react';
import HandRaisedChecker from '../HandRaised';

import Layout from '../../components/Layout'
import { SmallButton, LargeButton } from '../../components/Components';

import sunbathing from '../../images/sunbathing.png';
import doctor from '../../images/doctor.png';

function Q2({ setAnswer }) {
  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [isRightHandRaised, setIsRightHandRaised] = useState(false);
  const [bothHandsRaised, setBothHandsRaised] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    const host = "cpsc484-02.stdusr.yale.internal:8888";

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
  }); // Empty dependency array to ensure this effect runs only once

  const findClosestPerson = (people) => {
    let closestPerson = null;
    let closestDepth = Infinity; 
  
    for (const person of people) {
      // Assuming hip joint represents the depth
      const hipDepth = person.joints[0].position.z;
      if (hipDepth < closestDepth) 
      {
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
      
      if (left < head) {
        setIsLeftHandRaised(true);
        setIsRightHandRaised(false);
        setBothHandsRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
          setAnswer('0');
        }

      } 
      else if (right < head)
      {
        setIsRightHandRaised(true);
        setIsLeftHandRaised(false);
        setBothHandsRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
          setAnswer('1');
        }
      }
      else 
      {
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
        <h1 style={{ marginTop: '30px', marginBottom: '-100px' }}>i would prefer a... </h1>
        <div class="container">
          <LargeButton img={sunbathing} 
                       alt="person laying on chair with knees up under the sun" 
                       text="casual environment"
                       isHandRaised={isLeftHandRaised}></LargeButton>
          <div class="divider"></div>
          <LargeButton img={doctor} 
                       alt="person with stethoscope around their shoulders wearing lab coat"
                       text="formal environment"
                       isHandRaised={isRightHandRaised}></LargeButton>
        </div>
        <div style={{ marginTop: '-140px' }}>
        <p style={{ fontSize: '20px', color: 'white', marginBottom: '10px', textAlign: 'center' }}>raise both hands to...</p>
          <SmallButton text="go back" isHandRaised={bothHandsRaised}></SmallButton>
        </div>
        <div style={{ fontFamily: 'Sora', position: 'absolute', top: '50px', right: '100px' }}>
          {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q3" />}
          {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q3" />}
          {bothHandsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q1" />}
        </div>
    </Layout>
  );
}

export default Q2;

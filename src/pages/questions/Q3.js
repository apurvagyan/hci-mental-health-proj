import React, { useEffect, useState } from 'react';
import HandRaisedChecker from '../HandRaised';

import Layout from '../../components/Layout'

import { SmallButton, LargeButton } from '../../components/Components';

import expert from '../../images/expert.png';
import friend from '../../images/friend.png';

function Q3({ setAnswer }) {
  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [isRightHandRaised, setIsRightHandRaised] = useState(false);
  const [bothHandsRaised, setBothHandsRaised] = useState(false);
  const [bothHandRaised, setbothHandRaised] = useState(false);
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
        <h1 style={{ marginTop: '30px', marginBottom: '-100px' }}>i would rather talk to... </h1>
        <div class="container">
          <LargeButton img={expert} 
                       alt="person with an award" 
                       text="a professional"
                       isHandRaised={isLeftHandRaised}></LargeButton>
          <div class="divider"></div>
          <LargeButton img={friend} 
                       alt="two people with arms around each others shoulders"
                       text="another student"
                       isHandRaised={isRightHandRaised}></LargeButton>
        </div>
        <div style={{ marginTop: '-140px' }}>
        <p style={{ fontSize: '20px', color: 'white', marginBottom: '10px', textAlign: 'center' }}>raise both hands to...</p>
          <SmallButton text="go back" isHandRaised={bothHandsRaised}></SmallButton>
        </div>
        <div style={{ fontFamily: 'Sora', position: 'absolute', top: '50px', right: '100px' }}>
        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q4" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q4" />}
        {bothHandsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q2" />}
        </div>
        
    </Layout>
  );
}

export default Q3;

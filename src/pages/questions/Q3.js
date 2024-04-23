// Q3.js
import React from 'react';
import { useEffect, useState} from 'react';
import HandRaisedChecker from '../HandRaised';

import Layout from '../../components/Layout'
import { SmallButton, LargeButton } from '../../components/Components';

import expert from '../../images/expert.png';
import friend from '../../images/friend.png';

function Q3() {
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
        <h1 style={{ marginTop: '20px', marginBottom: '-100px' }}>i would rather talk to... </h1>
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
        <p style={{ fontSize: '20px', color: 'white', marginBottom: '10px' }}>raise both hands to...</p>
          <SmallButton text="go back"></SmallButton>
        </div>

        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q4" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q4" />}
    </Layout>
  );
}

export default Q3;
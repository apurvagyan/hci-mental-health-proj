// instructions.js
import React, {useState, useEffect} from 'react';

import Layout from '../components/Layout'

function Instructions() {
 const [bothHandsRaised, setBothHandsRaised] = useState(false);
 const [handRaisedTimer, setHandRaisedTimer] = useState(null);

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
  }, []);

  const checkHands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;
      
      if (left < head && right < head) {
        if (!handRaisedTimer) {
          // Start timer if not started already
          const timer = setTimeout(navigateToDifferentPage, 5000); // 5 seconds
          setHandRaisedTimer(timer);
        } else {
          // Reset timer
          clearTimeout(handRaisedTimer);
          const timer = setTimeout(navigateToDifferentPage, 5000); // 5 seconds
          setHandRaisedTimer(timer);
        }
      } else {
        // Hands not raised, reset timer
        clearTimeout(handRaisedTimer);
        setHandRaisedTimer(null);
      }
    }
  };

  const navigateToDifferentPage = () => {
    window.location.href = "/Q1";
  };

  return (
    <Layout>
        <h1 style={{ fontSize: '125px' }}>instructions</h1>
        <br/>
        <p style={{ fontSize: '40px', textAlign: 'center' }}>
          answer a series of questions to receive a <b style={{ color: 'white '}}><i>personalized</i></b> mental health and wellness resource recommendation! 
          <br/><br/>stay to the <b style={{ color: 'white '}}><i>left</i></b> or <b style={{ color: 'white '}}><i>right</i></b> to choose your answer...
          <br/><br/> raise both hands to begin!
        </p>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Instructions;


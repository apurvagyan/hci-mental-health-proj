// Q4.js
import React, { useEffect, useState } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout';
import { LargeButton } from '../../components/Button';
import meditation from '../../images/meditation.png';
import talk from '../../images/talk.png';

function Q4({ setAnswer, answer1, answer2, answer3, answer4 }) {
  console.log("q1Response:", answer1);
  console.log("q2Response:", answer2);
  console.log("q3Response:", answer3);
  console.log("q4Response:", answer4);

  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [isRightHandRaised, setIsRightHandRaised] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);
  // const [q4Response, setQ4Response] = useState(null); // Define q4Response state

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
          setAnswer('0'); // Save Q4 response
        }

      } 
      else if (right < head)
      {
        setIsRightHandRaised(true);
        if (!countdownStarted) 
        {
          setCountdownStarted(true);
          setAnswer('1'); // Save Q4 response
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

  const getDestinationURL = () => {
    // Define the mapping of responses to destination URLs
    const mappings = {
      "0000": "/YC3",
      "0001": "/YC3",
      "0010": "/Walden",
      "0011": "/Walden",
      "0100": "/YaleHealth",
      "0101": "/YaleHealth",
      "0110": "/Walden",
      "0111": "/Walden",
      "1000": "/GLC",
      "1001": "/YC3",
      "1010": "/GLC",
      "1011": "/Walden",
      "1100": "/YC3",
      "1101": "/YC3",
      "1110": "/GLC",
      "1111": "/Walden",
    };

    // Convert responses to a string and get the corresponding destination URL
    const responseString = `${answer1}${answer2}${answer3}${answer4}`;
    return mappings[responseString];
  };

  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i want to... </h1>
        <div className="container">
          <LargeButton img={meditation} 
                       alt="person meditating with sparkles around them" 
                       text="do self care"
                       isHandRaised={isLeftHandRaised} />
          <div className="divider"></div>
          <LargeButton img={talk} 
                       alt="two people talking with dialogue bubbles above them"
                       text="talk to someone"
                       isHandRaised={isRightHandRaised} />
        </div>
        {isLeftHandRaised && (
          <HandRaisedChecker countdownStarted={countdownStarted} destinationURL={getDestinationURL()} />
        )}
        {isRightHandRaised && (
          <HandRaisedChecker countdownStarted={countdownStarted} destinationURL={getDestinationURL()} />
        )}
    </Layout>
  );
}

export default Q4;

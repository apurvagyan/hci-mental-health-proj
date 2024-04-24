// instructions.js
import React, {useState, useEffect} from 'react';
import HandRaisedChecker from './HandRaised';

import Layout from '../components/Layout'

function Instructions() {
  const [HandsRaised, setHandsRaised] = useState(false);
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
        // if (frame && frame["people"][0]) {
        //   checkHands(frame);
        // }
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
      
      if (left < head && right < head)
      {
        setHandsRaised(true);
        if (!countdownStarted) 
        {
          setCountdownStarted(true);
        }
      }
      else 
      {
        // Reset both hand states if neither hand is raised
        setHandsRaised(false);
        if (countdownStarted) 
        {
          setCountdownStarted(false);
        }
    }
    }
  };

  return (
    <Layout>
        <h1 style={{ fontSize: '90px', paddingTop: '50px' }}>instructions</h1>
        <p style={{ fontFamily: 'Sora', textAlign: 'center', color: 'white', marginBottom: '-50px', fontSize: '30px' }}>answer a series of questions to receive a <b style={{ color: 'white'}}><i>personalized</i></b> mental health and wellness resource recommendation!</p>
        <p style={{ fontSize: '40px', textAlign: 'center', marginTop: '0px', marginBottom: '-50px' }}>
          <br/><br/>• raise your<b style={{ color: 'white '}}><i> left hand</i></b> or <b style={{ color: 'white '}}><i>right hand </i></b>to choose your answer...
          <br/><br/>• during the questionnaire, raise <b style={{ color: 'white'}}><i>both hands</i></b> to go back!
        </p>
        <br/><br/><br/><br/>
        <h1>raise both hands to continue...</h1>
        {HandsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q1" />}
    </Layout>
  );
}

export default Instructions;


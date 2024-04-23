// Q2.js
import React from 'react';
import { useEffect, useState} from 'react';
import HandRaisedChecker from '../HandRaised';

import Layout from '../../components/Layout'
// import { LargeButton } from '../../components/Components';
import { LargeButton } from '../../components/Button';

import sunbathing from '../../images/sunbathing.png';
import doctor from '../../images/doctor.png';

function Q2() {
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
        if (frame && frame.people.length >= 0) {
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
        <h1 style={{ marginBottom: '-100px' }}>i would prefer a... </h1>
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
        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q3" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Q3" />}
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q2;


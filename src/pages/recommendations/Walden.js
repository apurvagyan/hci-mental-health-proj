// Walden.js

import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import HandRaisedChecker from '../HandRaised';
import { SmallButton } from '../../components/Components';
import walden from '../../images/walden.png';

function Walden() {
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

      if (left < head && right > head) {
        setIsLeftHandRaised(true);
        setIsRightHandRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }

      }
      else if (right < head && left > head) {
        setIsRightHandRaised(true);
        setIsLeftHandRaised(false);
        if (!countdownStarted) {
          setCountdownStarted(true);
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
      <div>
        <h2>We recommend:</h2>
        <h1 style={{ textAlign: 'left' }}>Walden Peer Counseling</h1>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <p style={{ marginTop: '50px', marginRight: '100px' }}>Welch Hall, B Basement, 330 College St,
            <br />New Haven, CT 06511
            <br /><br />(203) 432-8255
          </p>
          <div style={{ textAlign: 'right', marginTop: '0px' }}>
            <img class="img-qr" src={walden} alt="walden qr code"></img>
          </div>
        </div>

        <p style={{ fontSize: '24px', color: 'white' }}>use your <i><b>left or right hand </b>to select</i></p>
        <div style={{ fontFamily: 'Sora', position: 'absolute', top: '50px', right: '100px' }}>
        {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/CentralizedResources" />}
        {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/WaldenTestimonials" />}
        </div>
        <div class="button-container">
          <SmallButton text="explore other options" isHandRaised={isLeftHandRaised} />
          <SmallButton text="see what others think" isHandRaised={isRightHandRaised} />
        </div>
      </div>
    </Layout>
  );
}

export default Walden;
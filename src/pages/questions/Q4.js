// Q4.js
import React, { useState, useEffect } from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Button';

import meditation from '../../images/meditation.png';
import talk from '../../images/talk.png';

function Q4() {
  const [handInitial, leftHandRaised, rightHandRaised] = useState(false);
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
          seeQ3Hands(frame);
        }
      }
    };

    startFrames();

    return () => {
      // Clean up WebSocket connection if needed
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  const seeQ3Hands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;

      if (left < head) {
        leftHandRaised(true);
        window.location.href = '/Q4';
      } else if (right < head) {
        rightHandRaised(true);
        window.location.href = '/Q4';
      }
    }
  };
  return (
    <Layout>
      <h1 style={{ marginBottom: '-100px' }}>i want to... </h1>
      <div>
        {handInitial}
      </div>
      <div class="container">
        <LargeButton img={meditation}
          alt="person meditating with sparkles around them"
          text="do self care"></LargeButton>
        <div class="divider"></div>
        <LargeButton img={talk}
          alt="two people talking with dialogue bubbles above them"
          text="talk to someone"></LargeButton>
      </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q4;


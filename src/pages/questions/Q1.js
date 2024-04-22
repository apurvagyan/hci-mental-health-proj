// Q1.js
import React, { useState, useEffect } from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Button';

import mentalHealthIcon from '../../images/mental-health-icon.png';
import wellnessIcon from '../../images/wellness-resources.png';


function Q1() {
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
          seeQ1Hands(frame);
        }
      }
    };

    startFrames();

    return () => {
      // Clean up WebSocket connection if needed
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  const seeQ1Hands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;

      if (left < head) {
        leftHandRaised(true);
        window.location.href = '/Q2';
      } else if (right < head) {
        rightHandRaised(true);
        window.location.href = '/Q2';
      }
    }
  };

  return (
    <Layout>
      <h1 style={{ marginBottom: '-100px' }}>i am looking for... </h1>
      <div>
        {handInitial}
      </div>
      <div class="container">
        <LargeButton img={mentalHealthIcon}
          alt="person's head with brain"
          text="mental health resources"></LargeButton>
        <div class="divider"></div>
        <LargeButton img={wellnessIcon} alt="person's head with lotus flower" text="wellness resources"></LargeButton>
      </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q1;

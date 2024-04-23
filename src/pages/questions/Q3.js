// Q3.js
import React from 'react';
import { useEffect, useState} from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Components';

import expert from '../../images/expert.png';
import friend from '../../images/friend.png';

function Q3() {
  const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
  const [isRightHandRaised, setIsRightHandRaised] = useState(false);

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
        window.location.href = "/Q4";

      } 
      else if (right < head)
      {
        setIsRightHandRaised(true);
        window.location.href = "/Q4";
      }
      else 
      {
        // Reset both hand states if neither hand is raised
        setIsLeftHandRaised(false);
        setIsRightHandRaised(false);
    }
    }
  };
  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i would rather talk to... </h1>
        <div class="container">
          <LargeButton img={expert} 
                       alt="person with an award" 
                       text="a professional"></LargeButton>
          <div class="divider"></div>
          <LargeButton img={friend} 
                       alt="two people with arms around each others shoulders"
                       text="another student"></LargeButton>
        </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q3;


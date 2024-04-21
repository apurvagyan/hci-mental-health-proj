import React, { useState, useEffect } from 'react';
import './Home.css'; 
import Countdown from './CountdownCircle';


function Home() {
  const [handsRaised, setHandsRaised] = useState(false);
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
      
      if (left < head && right < head) {
        setHandsRaised(true);
      } else {
        setHandsRaised(false);
      }
    }
  };

  return (
    <div className="home-container">
      <div className = "main-text">
        feeling down or stressed lately?
      </div>
      <div className = "sub-text">
      Let us help you find the best mental health and 
      <div class="col">
      wellness resource <b><i>for you.</i></b>
    </div>
      </div>
      <div className = "countdown">
      {handsRaised && <Countdown />}
      </div>
      <div className = "bottom-text">
        stand still for 5 seconds to continue..
      </div>
      <div className = "bottom-final"> and take a <b><i>deep breath</i></b></div>
    </div>
    
  );
}

export default Home;
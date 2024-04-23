import React, { useState, useEffect } from 'react';
import './Home.css'; 
import CountdownCircle from './CountdownCircle';

function Home() {
  const [handsRaised, setHandsRaised] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

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
        setHandsRaised(true);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }
      } else {
        setHandsRaised(false);
        if (countdownStarted) {
          setCountdownStarted(false);
        }
      }
    }
  };

  return (
    <div className="home-container">
      <div className="main-text">
        feeling down or stressed lately?
      </div>
      <div className="sub-text">
        Let us help you find the best mental health and 
        <div class="col">
          wellness resource <b><i>for you.</i></b>
        </div>
      </div>
      <div className="countdown">
        {handsRaised && <CountdownCircle countdownStarted={countdownStarted} />}
      </div>
      <div className="bottom-text">
        raise both hands to continue...
      </div>
      <div className="bottom-final"> and take a <b><i>deep breath</i></b></div>
    </div>
  );
}

export default Home;

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
  }, []);

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
      const head = person.joints[26].position.y;
      const left = person.joints[8].position.y;
      const right = person.joints[15].position.y;
      
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

import React from 'react';
import './Home.css'; 
import Countdown from './CountdownCircle';

function Home() {
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
        <Countdown />
      </div>
      <div className = "bottom-text">
        stand still for 5 seconds to continue..
      </div>
      <div className = "bottom-final"> and take a <b><i>deep breath</i></b></div>
    </div>
    
  );
}

export default Home;
import React, { useState, useEffect } from 'react';
import './CountdownCircle.css';

function CountdownCircle() {
    const [countdown, setCountdown] = useState(5);
  
    useEffect(() => {
      const interval = setInterval(() => 
      {
        setCountdown(prevCountdown => 
          {
          if (prevCountdown > 0) 
          {
            return prevCountdown - 1;
          } 
          else 
          {
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const circleStyle = {
      animationDuration: `${countdown}s` 
    };
  
    return (
      <div className="countdown-circle-container">
        <div className="countdown-circle" style={circleStyle}>
          {countdown}
        </div>
      </div>
    );
  }
  
  export default CountdownCircle;
import React, { useState, useEffect } from 'react';
import './CountdownCircle.css'; 

function CountdownCircle() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      // Navigate to a different page once countdown finishes
      window.location.href = '/Instructions';
    } else {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [countdown]);

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
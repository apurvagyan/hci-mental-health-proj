import React, { useState, useEffect } from 'react';
import './CountdownCircle.css'; 

function CountdownCircle({ countdownStarted }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdownStarted && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (countdown === 0) {
      // Navigate to a different page once countdown finishes
      window.location.href = '/Instructions';
    }
  }, [countdown, countdownStarted]);

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

import { useState, useEffect } from 'react';
import './Home.css'; 

function HandRaisedChecker({ countdownStarted, destinationURL }) {
      const [countdown, setCountdown] = useState(5);
    
      useEffect(() => {
        if (countdownStarted && countdown > 0) {
          const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
          }, 1000);
    
          return () => clearInterval(interval);
        } else if (countdown === 0) {
          // Navigate to a different page once countdown finishes
          window.location.href = destinationURL;
        }
      }, [countdown, countdownStarted, destinationURL]);
    

  return (
    <div className="countdown-number">{countdown}</div>
  );
}

export default HandRaisedChecker;
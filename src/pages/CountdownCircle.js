import React, { useState, useEffect } from 'react';
import './CountdownCircle.css'; 
import $ from 'jquery';

// set up host for becton center tv
var host = "cpsc484-02.stdusr.yale.internal:8888";
var hands_raised = true;

// call start method to run frames
$(document).ready(function () {
    frames.start();
});

// define frames for program execution
var frames = {
    socket: null,

    start: function () {
        var url = "ws://" + host + "/frames";
        frames.socket = new WebSocket(url);
        frames.socket.onmessage = function (event) {
            frames.show(JSON.parse(event.data));
        }
    },

    show: function (frame) {
      if (frame && frame["people"][0]) 
      {
        hands_raised = check_hands(frame);
    }
    }
};

function check_hands(frame) 
{
  if (frame && frame.people[0]) 
  {
      var head = frame.people[0].joints[26].position.y;

      var left = frame.people[0].joints[8].position.y;

      var right = frame.people[0].joints[15].position.y;
      
      if (left < head && right < head)
      {
        return true;
      }
  }
  return false; 
}

// function CountdownCircle() {
//   const [countdown, setCountdown] = useState(5);

//   useEffect(() => {
//     const interval = setInterval(() => 
//     {
//       setCountdown(prevCountdown => 
//         {
//         if (prevCountdown > 0) 
//         {
//           return prevCountdown - 1;
//         } 
//         else 
//         {
//           clearInterval(interval);
//           return 0;
//         }
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   const circleStyle = {
//     animationDuration: `${countdown}s` 
//   };

//   return (
//     <div className="countdown-circle-container">
//       <div className="countdown-circle" style={circleStyle}>
//         {countdown}
//       </div>
//     </div>
//   );
// }

  
//   export default CountdownCircle; 

function CountdownCircle() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
      if (hands_raised) {
          const interval = setInterval(() => {
              setCountdown(prevCountdown => {
                  if (prevCountdown > 0) {
                      return prevCountdown - 1;
                  } else {
                    clearInterval(interval);
                    // Navigate to a different page once countdown finishes
                    window.location.href = '/Instructions';
                    return 0;
                  }
              });
          }, 1000);

          return () => clearInterval(interval);
      }
  });

  const circleStyle = {
      animationDuration: hands_raised ? `${countdown}s` : '0s' 
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

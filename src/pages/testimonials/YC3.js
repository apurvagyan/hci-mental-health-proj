import React, { useState, useEffect } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../../components/Layout';
import { SmallButton, TextBox } from '../../components/Components';

import yc3 from '../../images/yale-health.png';

function YC3() {
  const [bothHandsRaised, setBothHandsRaised] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  useEffect(() => {
    const host = 'cpsc484-02.stdusr.yale.internal:8888';

    const startFrames = () => {
      const url = 'ws://' + host + '/frames';
      const socket = new WebSocket(url);
      socket.onmessage = function (event) {
        const frame = JSON.parse(event.data);
        if (frame && frame['people'][0]) {
          checkHands(frame);
        }
      };
    };

    startFrames();

    return () => {
      // Clean up WebSocket connection if needed
    };
  });

  const checkHands = (frame) => {
    if (frame && frame.people[0]) {
      const head = frame.people[0].joints[26].position.y;
      const left = frame.people[0].joints[8].position.y;
      const right = frame.people[0].joints[15].position.y;

      if (left < head && right < head) {
        setBothHandsRaised(true);
        if (!countdownStarted) {
          setCountdownStarted(true);
        }
      } else {
        setBothHandsRaised(false);
        if (countdownStarted) {
          setCountdownStarted(false);
        }
      }
    }
  };

  return (
    <Layout>
      <div>
        <div>
          <h2>Hear what other students think!</h2>
          <h1 style={{ textAlign: 'left' }}>Yale College Community Care (YC3)</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <TextBox text="I think that YC3 is convenient because it's so easy to schedule an appointment whenever you need one. They helped me develop solid stress and time management strategies that I use every day."></TextBox>
            <TextBox text="YC3 provided me with a lot of different resources when I was going through a difficult time during the semester. My counselor was really receptive."></TextBox>
            <TextBox text="Sometimes the counselors are unequipped to deal with your mental health struggles. When I went, they actually worsened my stress, and I thought they were somewhat dismissive of my feelings."></TextBox>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '60px' }}>
            <img
              className="img-qr"
              src={yc3}
              alt="YC3 QR code"
              style={{ marginRight: '0px' }}
            ></img>
            <p style={{ fontSize: '24px', color: 'white', textAlign: 'center' }}>Visit the website!</p>
            <p
              style={{ fontSize: '24px', color: 'white', textAlign: 'center' }}
            >
              <i>raise both hands to...</i>
            </p>
            <div className="button-container">
              <SmallButton text="start over" isHandRaised={bothHandsRaised} />
            </div>
            
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
              <img class="img-qr" src={yc3} alt="yc3 code" style={{ margin: '0px', width: '425px' }}></img>
              <p style={{ alignSelf: 'center', textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '10px' }}><i>raise both hands to...</i></p>
              <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                  <SmallButton text="start over" />
              </div>
            </div>          </div>
        </div>
      </Layout>
      
    );
  }
  
  export default YC3;
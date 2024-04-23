import React, { useState, useEffect } from 'react';
import HandRaisedChecker from '../HandRaised';
import Layout from '../components/Layout'
import { SmallButton } from '../components/Components';
import mentalHealthImage from '../images/mental_health_resources.png';

function CentralizedResources() {
    const [isLeftHandRaised, setIsLeftHandRaised] = useState(false);
    const [isRightHandRaised, setIsRightHandRaised] = useState(false);
    const [countdownStarted, setCountdownStarted] = useState(false);

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

            if (left < head) {
                setIsLeftHandRaised(true);
                if (!countdownStarted) {
                    setCountdownStarted(true);
                }

            }
            else if (right < head) {
                setIsRightHandRaised(true);
                if (!countdownStarted) {
                    setCountdownStarted(true);
                }
            }
            else {
                // Reset both hand states if neither hand is raised
                setIsLeftHandRaised(false);
                setIsRightHandRaised(false);
                if (countdownStarted) {
                    setCountdownStarted(false);
                }
            }
        }
    };
    return (
        <Layout>
            <div>
                <h1>see all of the resources</h1>
                <h1 style={{ marginBottom: '-100px' }}>available to you!</h1>
                <div class="container">
                    <img class="img-qr" src={mentalHealthImage} style={{ alignItems: 'center', width: '500px', height: '500px' }} alt="doc qr code"></img>
                </div>
                {isLeftHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/CentralizedResources" />}
                {isRightHandRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/Final" />}
                <div class="button-container">
                    <SmallButton text="go back" />
                    <SmallButton text="exit" />
                </div>

                {/* <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p> */}
                {/* <SmallButton text="explore other options" /> */}
            </div>

        </Layout>
    );
}

export default CentralizedResources;
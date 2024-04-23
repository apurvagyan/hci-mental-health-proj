import React, { useState, useEffect } from 'react';
import HandRaisedChecker from './HandRaised';
import Layout from '../components/Layout'
import { SmallButton } from '../components/Components';
import mentalHealthImage from '../images/mental_health_resources.png';

function CentralizedResources() {
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
        <Layout>
            <div>
                <h1>see all of the resources</h1>
                <h1 style={{ marginBottom: '-100px' }}>available to you!</h1>
                <div class="container">
                    <img class="img-qr" src={mentalHealthImage} style={{ alignItems: 'center', width: '500px', height: '500px' }} alt="doc qr code"></img>
                </div>
                {handsRaised && <HandRaisedChecker countdownStarted={countdownStarted} destinationURL="/" />}
                <div class="button-container">
                    <SmallButton text="start over" />
                </div>
            </div>

        </Layout>
    );
}

export default CentralizedResources;
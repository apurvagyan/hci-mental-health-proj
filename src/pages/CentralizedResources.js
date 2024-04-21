import React from 'react';

import Layout from '../components/Layout'
import mentalHealthImage from '../images/mental_health_resources.png';

function CentralizedResources() {
    return (
        <Layout>
            <div>
                <h1>see all of the resources</h1>
                <h1 style={{ marginBottom: '-100px' }}>available to you!</h1>
                <div class="container">
                    <img class="img-qr" src={mentalHealthImage} style={{ alignItems: 'center', width: '500px', height: '500px' }} alt="doc qr code"></img>
                </div>

                {/* <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p> */}
                {/* <SmallButton text="explore other options" /> */}
            </div>

        </Layout>
    );
}

export default CentralizedResources;
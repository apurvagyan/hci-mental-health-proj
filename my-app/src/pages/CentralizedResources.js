import React from 'react';

import Layout from '../components/Layout'
import mentalHealthImage from '../images/mental_health_resources.png';

function CentralizedResources() {
    return (
        <Layout>
            <div>
                <h1>see all of the resources</h1>
                <h1>available to you</h1>
                <img src={mentalHealthImage} style={{ width: '300px', height: '300px' }} alt="doc qr code"></img>

                <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
                {/* <SmallButton text="explore other options" /> */}
            </div>

        </Layout>
    );
}

export default CentralizedResources;
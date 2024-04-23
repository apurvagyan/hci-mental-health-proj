import React from 'react';

import Layout from '../components/Layout'
import { SmallButton } from '../components/Components';
import mentalHealthImage from '../images/mental_health_resources.png';

function CentralizedResources() {
    return (
        <Layout>
            {/* <div> */}
                <h1 style={{ marginTop: '50px' }}>see all of the resources</h1>
                <h1>available to you!</h1>
                {/* <div class="container"> */}
                    <img class="img-qr" src={mentalHealthImage} alt="doc qr code" style={{ width: '300px', height: '300px' }}></img>
                {/* </div> */}
                <div class="button-container">
                    <SmallButton text="explore other options" />
                    <SmallButton text="see what others think" />
                </div>
            {/* </div> */}
        </Layout>
    );
}

export default CentralizedResources;
// Q1.js
import React from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Components';

import mentalHealthIcon from '../../images/mental-health-icon.png';
import wellnessIcon from '../../images/wellness-resources.png';

function Q1() {
  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i am looking for... </h1>
        <div class="container">
          <LargeButton img={mentalHealthIcon} 
                       alt="person's head with brain" 
                       text="mental health resources"></LargeButton>
          <div class="divider"></div>
          <LargeButton img={wellnessIcon} alt="person's head with lotus flower" text="wellness resources"></LargeButton>
        </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q1;

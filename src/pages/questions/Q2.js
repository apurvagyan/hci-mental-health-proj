// Q2.js
import React from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Button';

import sunbathing from '../../images/sunbathing.png';
import doctor from '../../images/doctor.png';

function Q2() {
  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i would prefer a... </h1>
        <div class="container">
          <LargeButton img={sunbathing} 
                       alt="person laying on chair with knees up under the sun" 
                       text="casual environment"></LargeButton>
          <div class="divider"></div>
          <LargeButton img={doctor} 
                       alt="person with stethoscope around their shoulders wearing lab coat"
                       text="formal environment"></LargeButton>
        </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q2;


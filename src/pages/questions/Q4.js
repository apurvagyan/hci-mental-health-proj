// Q4.js
import React from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Button';

import meditation from '../../images/meditation.png';
import talk from '../../images/talk.png';

function Q4() {
  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i want to... </h1>
        <div class="container">
          <LargeButton img={meditation} 
                       alt="person meditating with sparkles around them" 
                       text="do self care"></LargeButton>
          <div class="divider"></div>
          <LargeButton img={talk} 
                       alt="two people talking with dialogue bubbles above them"
                       text="talk to someone"></LargeButton>
        </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q4;


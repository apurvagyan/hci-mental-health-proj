// Q3.js
import React from 'react';

import Layout from '../../components/Layout'
import { LargeButton } from '../../components/Button';

import expert from '../../images/expert.png';
import friend from '../../images/friend.png';

function Q3() {
  return (
    <Layout>
        <h1 style={{ marginBottom: '-100px' }}>i would rather talk to... </h1>
        <div class="container">
          <LargeButton img={expert} 
                       alt="person with an award" 
                       text="a professional"></LargeButton>
          <div class="divider"></div>
          <LargeButton img={friend} 
                       alt="two people with arms around each others shoulders"
                       text="another student"></LargeButton>
        </div>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default Q3;


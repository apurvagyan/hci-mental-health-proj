// instructions.js
import React from 'react';

import Layout from '../components/Layout'

function instructions() {
  return (
    <Layout>
        <h1 style={{ fontSize: '125px' }}>instructions</h1>
        <br/>
        <p style={{ fontSize: '40px', textAlign: 'center' }}>
          answer a series of questions to receive a <b style={{ color: 'white '}}><i>personalized</i></b> mental health and wellness resource recommendation! 
          <br/><br/>stay to the <b style={{ color: 'white '}}><i>left</i></b> or <b style={{ color: 'white '}}><i>right</i></b> to choose your answer...
        </p>
      {/* </div> */}
      {/* <div> help button
        <p class='help-text'>raise both hands for help!</p>
      </div> */}
    </Layout>
  );
}

export default instructions;


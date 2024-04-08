// Q1.js
import React from 'react';

import Layout from '../components/Layout'
import mentalHealthIcon from '../images/mental-health-icon.png';
import wellnessIcon from '../images/wellness-resources.png';

function Q1() {
  return (
    <Layout>
      <div style={{ minHeight: '100vh', paddingBottom: '50px' }}>
        <h2 class='question'>i am looking for... </h2>
        <div style={{ position: 'absolute', width: '391.34px', height: '491.62px', left: '146px', top: '169px' }}>
          <button class='button-options'>
            <img src={mentalHealthIcon} class='option-one-img' alt="person's head with brain"></img>
            <p class='text-options'>mental health resources</p>
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          {/* Rounded Divider */}
          <div class='divider'></div>
        </div>
        <div style={{ position: 'absolute', width: '391.34px', height: '491.62px', left: '753px', top: '169px' }}>
          <button class='button-options'>
            <img src={wellnessIcon} class='option-two-img' alt="person's head with lotus flower symbol"></img>
            <p class='text-options'>wellness resources</p>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Q1;

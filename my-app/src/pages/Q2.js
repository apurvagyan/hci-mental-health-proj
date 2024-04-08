// Q1.js
import React from 'react';

import Layout from '../components/Layout'
import sunbathing from '../images/sunbathing.png';
import doctor from '../images/doctor.png';

function Q2() {
  return (
    <Layout>
      <div style={{ minHeight: '100vh', paddingBottom: '50px' }}>
        <h2 class='question'>i would prefer a... </h2>
        <div style={{ position: 'absolute', width: '391.34px', height: '491.62px', left: '146px', top: '169px' }}>
          <button class='button-options'>
            <img src={sunbathing} class='option-one-img' alt="person's head with brain"></img>
            <p class='text-options'>casual environment</p>
          </button>
        </div>
        <div style={{ position: 'relative' }}>
          {/* Rounded Divider */}
          <div class='divider'></div>
        </div>
        <div style={{ position: 'absolute', width: '391.34px', height: '491.62px', left: '753px', top: '169px' }}>
          <button class='button-options'>
            <img src={doctor} class='option-two-img' alt="person's head with brain"></img>
            <p class='text-options'>formal environment</p>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Q2;


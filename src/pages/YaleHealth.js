// YaleHealth.js

import Layout from '../components/Layout'
import { SmallButton } from '../components/Button';
import yaleHealth from '../images/yale-health.png';

function YaleHealth() {
    return (
      <Layout>
        <div>
          <h2>We recommend:</h2>
          <h1>Yale Health Mental Health and Counseling</h1>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <p style={{ marginTop: '50px', marginRight: '100px' }}>55 Lock Street,
              <br/>New Haven, CT 06520-8237
              <br/><br/>(203) 432-0290
            </p>
            <div style={{ textAlign: 'right', marginTop: '0px' }}>
              <img src={yaleHealth} style={{ width: '300px', height: '300px' }} alt="yale health qr code"></img>
            </div>
          </div>
          
          <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
          <SmallButton text="explore other options" />
        </div>
      </Layout>
      
    );
  }
  
  export default YaleHealth;
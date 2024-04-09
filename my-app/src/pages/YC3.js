// YC3.js

import Layout from '../components/Layout'
import { SmallButton } from '../components/Button';
import yc3 from '../images/yc3.png'

function YC3() {
    return (
      <Layout>
        <div>
          <h2>We recommend:</h2>
          <h1>Yale College Community Care (YC3)</h1>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <p style={{ marginTop: '50px', marginRight: '100px' }}>(203) 432-0290
              <br/>8:30am - 5pm
            </p>
            <div style={{ textAlign: 'right', marginTop: '0px' }}>
              <img src={yc3} style={{ width: '300px', height: '300px' }} alt="yc3 qr code"></img>
            </div>
          </div>
          
          <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
          <SmallButton text="explore other options" />
        </div>

      </Layout>
      
    );
  }
  
  export default YC3;
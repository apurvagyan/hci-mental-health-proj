// YC3.js

import Layout from '../../components/Layout'
import { SmallButton } from '../../components/Components';
import yc3 from '../../images/yc3.png'

function YC3() {
    return (
      <Layout>
        <div>
          <h2>We recommend:</h2>
          <h1 style={{ textAlign: 'left' }}>Yale College Community Care (YC3)</h1>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <p style={{ marginTop: '50px', marginRight: '100px' }}>(203) 432-0290
              <br/>8:30am - 5pm
            </p>
            <div style={{ textAlign: 'right', marginTop: '0px' }}>
              <img class="img-qr" src={yc3} alt="yc3 qr code"></img>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '24px', color: 'white' }}>use your <i><b>left or right hand</b> to select</i></p>
        <div class="button-container">
          <SmallButton text="explore other options" />
        </div>

      </Layout>
      
    );
  }
  
  export default YC3;
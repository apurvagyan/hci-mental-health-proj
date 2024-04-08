// YC3.js

import Layout from '../components/Layout'
import { SmallButton, LargeButton } from '../components/Button';

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
              <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fyalehealth.yale.edu%2Fdepartment%2Fmental-health-counseling&chs=180x180&choe=UTF-8&chld=L|2" style={{ width: '300px', height: '300px' }}></img>
            </div>
          </div>
          
          <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
          <SmallButton text="explore other options" />
        </div>

      </Layout>
      
    );
  }
  
  export default YC3;
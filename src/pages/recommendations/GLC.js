// GLC.js

import Layout from '../../components/Layout'
import { SmallButton } from '../../components/Components';
import glc from '../../images/glc.png';

function GLC() {
    return (
      <Layout>
        <div>
            <h2>We recommend:</h2>
            <h1 style={{ textAlign: 'left' }}>The Good Life Center</h1>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
                <p style={{ marginTop: '50px', marginRight: '100px' }}>Schwarzman Center, 2nd Floor
                    <br/>New Haven, CT 06511
                    <br/><br/>Silliman College, 4th Floor
                    <br/>New Haven, CT 06511
                </p>
                <div style={{ textAlign: 'right', marginTop: '0px' }}>
                <img class="img-qr" src={glc} alt="good life qr code"></img>
                </div>
            </div>
           
          
          <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
          <SmallButton text="explore other options" />
        </div>
      </Layout>
      
    );
  }
  
  export default GLC;
// Walden.js

import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import walden from '../../images/walden.png';

function Walden() {
    return (
      <Layout>
        <div>
          <div>
            <h2>Hear what other students think!</h2>
            <h1 style={{ textAlign: 'left '}}>Walden Peer Counseling</h1>
          </div>
            
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <TextBox text="The anonymous 24/7 hotline is really convenient and accessible. No matter what time it is, I know I can talk to someone about what's going on in my life."></TextBox>
              <TextBox text="I stop by drop-in hours all the time, even if I just want to talk about how my day is going. They are really kind and supportive."></TextBox>
              <TextBox text="The person that I talked to on the hotline was a little rude and judgmental, but when I called the other day they were a nice, active listener."></TextBox>
            </div>
            
            <img class="img-qr" src={walden} alt="walden qr code" style={{ marginRight: '0px' }}></img>
          </div>
            
          {/* <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p> */}
          {/* <SmallButton text="explore other options" /> */}
        </div>
      </Layout>
      
    );
  }
  
  export default Walden;
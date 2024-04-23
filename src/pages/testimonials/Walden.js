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
            
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
              <img class="img-qr" src={walden} alt="walden qr code" style={{ margin: '0px', width: '425px' }}></img>
              <p style={{ alignSelf: 'center', textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '10px' }}><i>raise both hands to...</i></p>
              <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                  <SmallButton text="start over" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      
    );
  }
  
  export default Walden;
// YaleHealth.js

import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import yaleHealth from '../../images/yale-health.png';

function YaleHealth() {
    return (
      <Layout>
        <div>
          <div>
            <h2>Hear what other students think!</h2>
            <h1 style={{ textAlign: 'left '}}>Yale Health Mental Health and Counseling</h1>
          </div>
            
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <TextBox text="My therapist is so helpful! They taught me new things I didn't even realize about myself and my mental health has improved a lot since I started seeing them."></TextBox>
              <TextBox text="My provider was able to diagnose my mental health issues and has been teaching me helpful coping strategies. It took me a long time to be paired with them, but it was definitely worth waiting for."></TextBox>
              <TextBox text="I waited very long before I got to see a therapist, and even longer to see a psychiatrist and receive medication. If you have urgent mental health issues, you might need to start somewhere else."></TextBox>
            </div>
            
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
              <img class="img-qr" src={yaleHealth} alt="yale health qr code" style={{ margin: '0px', width: '425px' }}></img>
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
  
  export default YaleHealth;
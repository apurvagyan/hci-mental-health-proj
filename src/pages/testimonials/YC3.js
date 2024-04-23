// YC3.js

import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import yc3 from '../../images/yale-health.png';

function YC3() {
    return (
      <Layout>
        <div>
          <div>
            <h2>Hear what other students think!</h2>
            <h1 style={{ textAlign: 'left '}}>Yale College Community Care (YC3)</h1>
          </div>
            
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <TextBox text="I think that YC3 is convenient because it's so easy to schedule an appointment whenever you need one. They helped me develop solid stress and time management strategies that I use everyday."></TextBox>
              <TextBox text="YC3 provided me with a lot of different resources when I was going through a difficult time during the semester. My counselor was really receptive."></TextBox>
              <TextBox text="Sometimes the counselors are unequipped to deal with your mental health struggles. When I went, they actually worsened my stress and I thought they were somewhat dismissive of my feelings."></TextBox>
            </div>
            
            <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
              <img class="img-qr" src={yc3} alt="yc3 code" style={{ margin: '0px', width: '425px' }}></img>
              <p style={{ alignSelf: 'center', textAlign: 'center', fontSize: '24px', color: 'white', marginBottom: '10px' }}><i>raise both hands to...</i></p>
              <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                  <SmallButton text="start over" />
              </div>
            </div>          </div>
        </div>
      </Layout>
      
    );
  }
  
  export default YC3;
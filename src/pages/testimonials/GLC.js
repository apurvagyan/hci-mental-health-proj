// GLC.js

import Layout from '../../components/Layout'
import { SmallButton, TextBox } from '../../components/Components';

import glc from '../../images/glc.png';

function GLC() {
    return (
      <Layout>
        <div>
          <div>
            <h2>Hear what other students think!</h2>
            <h1 style={{ textAlign: 'left '}}>The Good Life Center</h1>
          </div>
            
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <TextBox text="I go to all of the Good Life Center events because they help center my student life on campus. I really love going to yoga every week, and even the dance sessions sometimes."></TextBox>
              <TextBox text="I spend a lot of time here, especially in the Nap Room. Even when I'm stressed about never-ending midterms, GLC always has a really calm vibe."></TextBox>
              <TextBox text="The sandbox at the Good Life Center is super calming. 100% recommend just for that."></TextBox>
            </div>
            
            <img class="img-qr" src={glc} alt="good life center qr code" style={{ marginRight: '0px' }}></img>
          </div>
        </div>
      </Layout>
      
    );
  }
  
  export default GLC;
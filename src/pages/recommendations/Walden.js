// Walden.js

import Layout from '../../components/Layout'
import { SmallButton } from '../../components/Components';
import walden from '../../images/walden.png';

function Walden() {
  return (
    <Layout>
      <div>
        <h2>We recommend:</h2>
        <h1 style={{ textAlign: 'left' }}>Walden Peer Counseling</h1>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <p style={{ marginTop: '50px', marginRight: '100px' }}>Welch Hall, B Basement, 330 College St,
            <br />New Haven, CT 06511
            <br /><br />(203) 432-8255
          </p>
          <div style={{ textAlign: 'right', marginTop: '0px' }}>
            <img class="img-qr" src={walden} alt="walden qr code"></img>
          </div>
        </div>

        <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
        <div class="button-container">
          <SmallButton text="explore other options" />
          <SmallButton text="see what others think" />
        </div>
      </div>
    </Layout>

  );
}

export default Walden;
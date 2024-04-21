// YaleHealth.js

import Layout from '../../components/Layout'
import { SmallButton } from '../../components/Button';
import yaleHealth from '../../images/yale-health.png';

function YaleHealth() {
<<<<<<< HEAD:my-app/src/pages/YaleHealth.js
  return (
    <Layout>
      <div>
        <h2>We recommend:</h2>
        <h1>Yale Health Mental Health and Counseling</h1>
        <div style={{ display: 'flex', alignItems: 'stretch' }}>
          <p style={{ marginTop: '50px', marginRight: '100px' }}>55 Lock Street,
            <br />New Haven, CT 06520-8237
            <br /><br />(203) 432-0290
          </p>
          <div style={{ textAlign: 'right', marginTop: '0px' }}>
            <img src="https://chart.googleapis.com/chart?cht=qr&chl=https%3A%2F%2Fyalehealth.yale.edu%2Fdepartment%2Fmental-health-counseling&chs=180x180&choe=UTF-8&chld=L|2" style={{ width: '300px', height: '300px' }} alt="yale health qr code"></img>
=======
    return (
      <Layout>
        <div>
          <h2>We recommend:</h2>
          <h1 style={{ textAlign: 'left' }}>Yale Health Mental Health and Counseling</h1>
          <div style={{ display: 'flex', alignItems: 'stretch' }}>
            <p style={{ marginTop: '50px', marginRight: '100px' }}>55 Lock Street,
              <br/>New Haven, CT 06520-8237
              <br/><br/>(203) 432-0290
            </p>
            <div style={{ textAlign: 'right', marginTop: '0px' }}>
              <img class="img-qr" src={yaleHealth} alt="yale health qr code"></img>
            </div>
>>>>>>> e45582efa8e57fd50b071b44aa9c5e8ac9b3ad42:src/pages/YaleHealth.js
          </div>
        </div>
        <p style={{ fontSize: '24px', color: 'white' }}><i><b>move your hand</b> over the button for 5 seconds to select it</i></p>
        <SmallButton text="explore other options" />
      </div>
    </Layout>

  );
}

export default YaleHealth;
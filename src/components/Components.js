import '../components/Components.css';

import user from '../images/user.png';

const SmallButton = ({ onClick, text, isHandRaised }) => {
    return (
      <button className={`button small ${isHandRaised ? 'raised' : ''}`} onClick={onClick}>
        {text}
      </button>
    );
};  

const LargeButton = ({ onClick, img, alt, text, isHandRaised }) => {
    return (
        <button className={`button large ${isHandRaised ? 'raised' : ''}`}>
            <img src={img} alt={alt}></img>
            <br/>{text}
        </button>
    );
};

const TextBox = ({ text }) => {
    return (
        <div class="textbox" style={{ display: 'flex', alignItems: 'stretch' }}>
            <img src={user} alt="user icon" style={{ marginRight: '20px' }}></img>
            <p style = {{ alignSelf: 'center', margin: '0px', fontSize: '20px', color: 'white' }}>{text}</p>
            
        </div>
    );
};

export { SmallButton, LargeButton, TextBox };

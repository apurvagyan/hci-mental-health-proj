import '../components/Button.css';

const SmallButton = ({ onClick, text }) => {
    return (
        <button className="button small" onClick={onClick}>
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


export { SmallButton, LargeButton };

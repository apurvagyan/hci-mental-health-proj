import '../components/Button.css';

const SmallButton = ({ onClick, text }) => {
    return (
        <button className="button small" onClick={onClick}>
        {text}
        </button>
    );
};

const LargeButton = ({ onClick, text }) => {
    return (
        <button className="button large" onClick={onClick}>
        {text}
        </button>
    );
};

export { SmallButton, LargeButton };

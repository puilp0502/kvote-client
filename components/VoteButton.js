import { VoteStatus } from '../enums';

const VoteButton = (props) => {
    const { status, onClick, children } = props;
    return (
        <div>
            <div className={"button"} onClick={onClick}>{ children }</div>
            <style jsx>{`
                .button {
                    cursor: pointer;
                    border: 2px solid black;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 10px;
                }
            `}</style>
        </div>
    )
}

VoteButton.defaultProps = {
    status: VoteStatus.WAITING,
    onClick: () => { console.warn("VoteButton onClick missing")},
}

export default VoteButton;
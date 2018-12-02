export default (props) => {
    const { title, selected, onSelect } = props;
    return (
        <div onClick={onSelect} className={"candidate " + (selected ? "selected" : "")}>
            {title}
            <style jsx>{`
            .candidate {
                transition: .2s;
                width: 50%;
                min-width: 400px;
                font-size: 2rem;
                border-radius: 2px;
                box-shadow: 0px 0px 15px rgba(128, 128, 128, 0.2);
                margin: 10px;
                padding: 10px;
            }
            .candidate:hover {
                transform: translateZ(20px);
                background-color: #f4fce3;
            }
            .candidate:active {
                transform: translateZ(20px);
                background-color: #e9fac8
            }

            .candidate.selected {
                transform: translateZ(40px);
                background-color: #c0eb75;
            }
            .candidate.selected:active {
                transform: translateZ(20px);
                
            }
            `}</style>
        </div>
    )
}
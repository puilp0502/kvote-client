export default (props) => {
    const { title, selected, onSelect } = props;
    return (
        <div onClick={onSelect} className={"candidate " + (selected ? "selected" : "")}>
            {title}
            <style jsx>{`
            .candidate {
                font-size: 2rem;
                border: 2px solid black;
            }
            .candidate.selected {
                background-color: lime;
            }
            `}</style>
        </div>
    )
}
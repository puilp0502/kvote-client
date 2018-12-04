import Candidate from './Candidate';

const CandidateList = (props) => {
    const { options, currentSelection, onSelect } = props;
    const candidates = options.map(({ title }, i) => 
    <Candidate 
        key={i} 
        title={`${i + 1}. ${title}`} 
        onSelect={() => onSelect(i)}
        selected={currentSelection === i} />);
    return (
        <div className="candidates">
            {candidates}
            <style jsx>{`
            .candidates {
                perspective: 500px;
                width: 70%;
                min-width: 16rem;
                max-width: 36rem;
            }
            `}</style>
        </div>
    )
}

CandidateList.defaultProps = {
    currentSelection: -1,
    onSelect: () => console.warn("Candidate onSelect not provided"),
}

export default CandidateList;
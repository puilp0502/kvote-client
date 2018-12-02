export default (props) => {
    const { title } = props;
    return (
        <div>
            {title}
            <style jsx>{`
                border: 2px solid black;
            `}</style>
        </div>
    )
}
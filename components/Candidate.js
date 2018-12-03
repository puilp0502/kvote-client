import colors from '../themes/colors';
import Head from 'next/head';

export default (props) => {
    const { title, selected, onSelect } = props;
    return (
        <div onClick={onSelect} className={"candidate " + (selected ? "selected" : "")}>
            <Head>
                <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400" rel="stylesheet" key="stylesheet-notosans"/>
            </Head>
            {title}
            <style jsx>{`
            .candidate {
                transition: .15s;
                cursor: pointer;
                font-size: 1.4rem;
                font-family: 'Noto Sans KR', sans-serif;
                font-weight: 300;
                border-radius: 5px;
                border: 1.5px solid #4fc3f7;
                box-shadow: 0px 0px 8px rgba(128, 128, 128, 0.5);
                margin: 12px auto 12px auto;
                padding: 20px;
            }
            .candidate:hover {
                transform: translateZ(10px);
                box-shadow: 0px 0px 12px rgba(128, 128, 128, 0.5);
            }
            .candidate:active {
                transform: translateZ(5px);
                box-shadow: 0px 0px 10px rgba(128, 128, 128, 0.5);
                background-color: ${ colors.primary };
            }

            .candidate.selected {
                transform: translateZ(15px);
                box-shadow: 0px 0px 14px rgba(128, 128, 128, 0.5);
                background-color: ${ colors.light };
            }
            .candidate.selected:hover {
                transform: translateZ(18px);
            }
            .candidate.selected:active {
                transform: translateZ(5px);
                background-color: ${ colors.primary };
                
            }
            `}</style>
        </div>
    )
}
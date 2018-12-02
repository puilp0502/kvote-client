import { Component } from 'react';
import Router from 'next/router';
import Error from 'next/error';
import axios from '../axios';

import Candidate from '../components/Candidate';


const VoteStatus = Object.freeze({WAITING: 0, CASTING: 1, CASTED: 2});

export default class Vote extends Component {
    state = {
        currentSelection: -1,
        voteStatus: VoteStatus.WAITING,
    }
    static async getInitialProps({ req, query }) {
        try {
            let ballot = await axios.get("/votes/" + query.code).then(r => r.data);
            console.log(ballot);
            return { ballot, code: query.code }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 404) return { error: {message: "코드와 일치하는 투표가 존재하지 않습니다!", statusCode: 404} }
            }
            return { error: {message: "알 수 없는 오류", statusCode: 500} };
        }
    }
    onSelect = (i) => {
        this.setState({currentSelection: i});
    }
    onSubmit = () => {
        console.log("Submit " + this.state.currentSelection);
        this.setState({voteStatus: VoteStatus.CASTING});
        axios.post("/votes/" + this.props.code, {
            selection: this.state.currentSelection,
            caster: navigator.userAgent,
        }).then(resp => {
            if (resp.status === 200) this.setState({voteStatus: VoteStatus.CASTED});
        }).catch(err => {
            console.log("error occured:", err)
            this.setState({voteStatus: VoteStatus.WAITING});
        })
    }
    render() {
        if (this.props.error) {
            return <Error statusCode={this.props.error.statusCode} />
        }
        let { ballot } = this.props;
        let options = ballot.options;
        let candidates = options.map(({ title }, i) => 
            <Candidate 
                key={i} 
                title={`${i + 1}. ${title}`} 
                onSelect={() => this.onSelect(i)}
                selected={this.state.currentSelection === i} />);
        return (
            <div className="root">
                <div id="vote-header">
                    <div>현재 투표중:</div>
                    <h1><span>{ ballot.title }</span><span id="code">{"#" + this.props.code}</span></h1>
                </div>
                <div id="vote-candidates">
                    { candidates }
                </div>
                <div id="vote-form">
                    <button disabled={this.state.voteStatus !== VoteStatus.WAITING} onClick={this.onSubmit}>투표</button>
                </div>
                <style jsx>{`
                    .root {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    #vote-candidates {
                        perspective: 500px;
                    }
                `}</style>
            </div>
        )
    }
}
import { Component } from 'react';
import Router from 'next/router';
import Error from 'next/error';
import axios from '../axios';

import Candidate from '../components/Candidate';


export default class Vote extends Component {
    state = {
        currentSelection: 0,
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
    render() {
        if (this.props.error) {
            return <Error statusCode={this.props.error.statusCode} />
        }
        let { ballot } = this.props;
        let options = ballot.options;
        let candidates = options.map(({ title }, i) => <Candidate key={i} title={`${i + 1}. ${title}`} />)
        return (
            <div>
                <div id="voteHeader">
                    <div>현재 투표중:</div>
                    <h1><span>{ ballot.title }</span><span id="code">{"#" + this.props.code}</span></h1>
                </div>
                { candidates }
            </div>
        )
    }
}
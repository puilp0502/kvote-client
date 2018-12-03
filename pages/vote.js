import { Component } from 'react';
import Router from 'next/router';
import Error from 'next/error';
import Head from 'next/head';
import axios from '../axios';

import Candidate from '../components/Candidate';
import VoteButton from '../components/VoteButton';

import { VoteStatus } from '../enums';

export default class Vote extends Component {
    state = {
        currentSelection: -1,
        voteStatus: VoteStatus.WAITING,
    }
    raw = { header: null, isScrolled: false };
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
    componentDidMount() {
        this.raw.header = document.querySelector("#vote-header-container .vote-header");
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        let top = window.pageYOffset || document.documentElement.scrollTop;
        let { isScrolled, header } = this.raw;
        if (!isScrolled && top > 0) {
            // scrolled
            header.classList.add('scrolled'); 
            this.raw.isScrolled = true;
        } else if (isScrolled && top === 0) {
            // scrolled to top
            header.classList.remove('scrolled'); 
            this.raw.isScrolled = false;
        }
    }
    onSelect = (i) => {
        this.setState({currentSelection: i});
    }
    onSubmit = () => {
        if (this.state.voteStatus === VoteStatus.WAITING) {
            console.log("Submit " + this.state.currentSelection);
            this.setState({voteStatus: VoteStatus.CASTING});
            axios.post("/votes/" + this.props.code, {
                selection: this.state.currentSelection,
                caster: navigator.userAgent,
            }).then(resp => {
                if (resp.status === 200) this.setState({voteStatus: VoteStatus.CASTED, currentSelection: -1});
            }).catch(err => {
                console.log("error occured:", err)
                this.setState({voteStatus: VoteStatus.WAITING});
            })
        }
    }
    render() {
        if (this.props.error) {
            return <Error statusCode={this.props.error.statusCode} />
        }
        let { ballot } = this.props;
        let { voteStatus } = this.state;
        let options = ballot.options;
        let candidates = options.map(({ title }, i) => 
            <Candidate 
                key={i} 
                title={`${i + 1}. ${title}`} 
                onSelect={() => this.onSelect(i)}
                selected={this.state.currentSelection === i} />);
        let voteText = voteStatus === VoteStatus.WAITING ? "투표" : (voteStatus === VoteStatus.CASTING ? "투표 중..." : "투표 완료")
        return (
            <div className="root">
                <Head>
                    <title>Ballot #{this.props.code} :: K-Vote</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:300,400" rel="stylesheet" key="stylesheet-notosans"/>
                </Head>
                <div id="vote-header-container">
                    <div className="vote-header">
                        <div className="header-status">현재 투표중:</div>
                        <h1><span className="ballot-title">{ ballot.title }</span><span className="ballot-code">{"#" + this.props.code}</span></h1>
                    </div>
                </div>
                <div id="vote-header-shadow-container">
                    <div className="vote-header">
                        <div className="header-status">현재 투표중:</div>
                        <h1><span className="ballot-title">{ ballot.title }</span><span className="ballot-code">{"#" + this.props.code}</span></h1>
                    </div>
                </div>
                <div id="vote-candidates">
                    { candidates }
                </div>
                <div id="vote-form">
                    <VoteButton status={this.state.voteStatus} onClick={this.onSubmit}>{voteText}</VoteButton>
                </div>
                <style jsx global>{`
                    body, #__next { margin: 0; }
                `}</style>
                <style jsx>{`
                    .root {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        margin: 0;
                    }
                    #vote-header-container, #vote-header-shadow-container {
                        box-sizing: border-box;
                        width: 100%;
                        margin: 0 0 20px 0;
                        border-bottom: 1px solid rgba(0, 0, 0, 0.14);
                        background-color: white;
                        z-index: 1;
                    }
                    #vote-header-container {
                        position: fixed;
                        top: 0;
                    }
                    #vote-header-shadow-container {
                        visibility: hidden;
                    }
                    
                    .vote-header {
                        transition: .3s;
                        width: 70%;
                        max-width: 36rem;
                        min-width: 16rem;
                        margin: 25px auto;
                    }
                    .vote-header.scrolled {
                        margin: 5px auto;
                    }
                    .vote-header h1 {
                        margin-top: 15px;
                    }
                    .vote-header.scrolled h1 {
                        display: inline-block;
                        margin-top: 5px;
                        margin-left: 5px;
                    }
                    .header-status {
                        letter-spacing: 5px;
                        color: #a0a0a0;
                    }
                    .scrolled .header-status {
                        display: none;
                    }
                    .ballot-title {
                        font-weight: 300;
                        letter-spacing: 3px;
                        font-size: 2rem;
                    }
                    .scrolled .ballot-title {
                        font-size: 1.4rem;
                    }
                    .ballot-code {
                        font-size: 1.6rem;
                        letter-spacing: 1px;
                        color: darkgrey;
                        font-weight: 400;
                    }
                    .scrolled .ballot-code {
                        font-size: 1rem;
                        font-weight: 300;
                    }
                    #vote-candidates {
                        perspective: 500px;
                        width: 70%;
                        min-width: 16rem;
                        max-width: 36rem;
                    }
                    #vote-form {
                        margin: 1rem;
                    }
                `}</style>
            </div>
        )
    }
}
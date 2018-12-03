import { Component } from 'react';
import Head from 'next/head';
import { Router } from '../routes';

export default class Index extends Component {
    state = {
        code: ''
    }
    onTextChange = (e) => {
        this.setState({code: e.target.value.toUpperCase()});
    }
    onSubmit = () => {
        console.log("Entering ballot room " + this.state.code);
        Router.pushRoute('/vote/' + this.state.code);
    }
    render() {
        return (
            <div className="root">
                <Head>
                    <title>K-Vote</title>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport"/>
                    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR" rel="stylesheet" key="stylesheet-notosans"/>
                </Head>
                <div className="heading">
                    <h1 id="title">K-VOTE</h1>
                    <div id="heading-description">kweb voting system</div>
                </div>
                <div className="form">
                    <div>enter ballot code:</div>
                    <input type="text" id="code" onChange={this.onTextChange} value={this.state.code}></input>
                    <button onClick={this.onSubmit}>Enter</button>
                </div>
                <style jsx>{`
                .root {
                    width: 100%;
                    height: 100%;
                    min-height: 25rem;
                    display: grid;
                    grid-template-columns: 100%;
                    grid-template-rows: 30% 40% 30%;
                    justify-items: center;
                    align-items: center;
                }
                h1 {
                    flex-grow: 1;
                }
                `}</style>
                <style jsx global>{`
                html, body, #__next {
                    width: 100%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
                `}</style>
            </div>
            
        )
    }
}
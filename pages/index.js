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
    onKeyPress = (e) => {
        if (e.key === 'Enter') this.onSubmit();
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
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:300" rel="stylesheet" key="stylesheet-montserrat"/>
                </Head>
                <div className="heading">
                    <h1 id="title">K-VOTE</h1>
                    <div id="heading-description">kweb voting system</div>
                </div>
                <div className="form">
                    <div className="instruction">enter ballot code:</div>
                    <input type="text" autocorrect="off" id="code" onChange={this.onTextChange} onKeyPress={this.onKeyPress} value={this.state.code}></input>
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
                .heading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                h1 {
                    flex-grow: 1;
                    font-family: 'Montserrat', sans-serif;
                    font-weight: 300;
                    font-size: 3rem;
                }
                #heading-description {
                    font-family: 'Noto Sans KR', sans-serif;
                    letter-spacing: 2px;
                }
                .form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 100px;
                }
                .form .instruction {
                    font-family: 'Noto Sans KR', sans-serif;
                    letter-spacing: 2px;
                }
                .form input {
                    box-sizing: border-box;
                    font-size: 2rem;
                    text-align: center;
                    letter-spacing: .5rem;
                    width: 13rem;
                    padding: .5rem;
                    margin: .5rem;
                    border: 1px solid rgba(128, 128, 128, 0.7);
                }
                button {
                    background-color: white;
                    font-size: 1rem;
                    font-family: sans-serif;
                    border-radius: 5px;
                    padding: 5px 10px 5px 10px;
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
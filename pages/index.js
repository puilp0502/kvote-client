import { Component } from 'react';
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
                <h1>K-VOTE</h1>
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
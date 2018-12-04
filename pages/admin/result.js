import { Component } from 'react';
import axios from '../../axios';

export default class Admin extends Component {
    state = {
        code: '',
        auth_code: '',
        vote: null,
    }
    handleCodeChange = (e) => {
        this.setState({code: e.target.value});
    }
    handleAuthCodeChange = (e) => {
        this.setState({auth_code: e.target.value});
    }
    handleSubmit = (e) => {
        const { code, auth_code } = this.state;
        axios.get('/votes/' + code + '/result', {headers: {Authorization: auth_code}})
          .then(r => r.data).then(vote => this.setState({ vote }));
    }
    render() {
        const { handleCodeChange, handleAuthCodeChange, handleSubmit } = this;
        const { code, auth_code, vote } = this.state;
        let result = null;
        if (vote) {
            let options = vote.options && vote.options.map(({id, title, count}) => (
                <tr key={id}><td>{title}</td><td>{count}</td></tr>
            ))
            result = (
                <div>
                    <h2>{ vote.title }</h2>
                    <span>Type: {vote.type === 0 ? "Single" : "Multi" }</span>{' '}/{' '}
                    <span>Secret: {vote.secret === 2 ? "O" : "X" }</span>
                    <table>
                        <thead>
                        <tr>
                            <th>title</th>
                            <th>count</th>
                        </tr>
                        </thead>
                        <tbody>
                        { options }
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <div className="root">
                <div className="form">
                    <input onChange={handleCodeChange} value={code} placeholder="ballot code" />
                    <input type="password" onChange={handleAuthCodeChange} value={auth_code} placeholder="auth code" />
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                <div className="result">
                    { result }
                </div>
            </div>
        )
    }
}
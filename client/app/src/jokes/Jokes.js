import React, { Component } from 'react';
import axios from 'axios';

class Jokes extends Component {
    state = {
        users: []
    }
    render() {
        return (
            <div className="Jokes">
                <ul className="JokeList">
                    {this.state.users.map(user => (
                        <div className="indiv-joke">
                            <ul className="joke" key={user.id}>{user.setup}</ul>
                            <ul className="punchline" key={user.id}>{user.punchline}</ul>
                            <br></br>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        const token = localStorage.getItem('jwt');
        const reqOptions = {
            headers: {
                Authorization: token,
            }
        }
        axios
            .get('http://localhost:3300/api/jokes', reqOptions)
            .then(res => {
                console.log('Users Data:', res.data)
                this.setState({ users: res.data })
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/');
            })
    };

    logout = event => {
        localStorage.removeItem('jwt');
        this.props.history.push('/');
    }
}



export default Jokes;
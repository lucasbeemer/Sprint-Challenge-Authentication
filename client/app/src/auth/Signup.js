import React, { Component } from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    username: '',
    password: ''
  };
  render() {
    return (
      <form onSubmit={this.signup}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <div className="button">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    );
  }
  signup = event => {
    event.preventDefault();
    console.log(this.state);

    axios
      .post('http://localhost:3300/api/register', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/jokes');
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
}

export default SignUp;
import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Jokes from './jokes/Jokes';

import './App.css';

const Home = props => {
  return (
    <div>
      <h2>Welcome, and enjoy some cheesy jokes.</h2>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <nav>
            <NavLink to="/" exact>Home</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/jokes">Jokes</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink className="signout" onClick={this.signout} to="/">Sign Out</NavLink>
          </nav>
        <h1 classname="App-title">Dad Jokes</h1>
          <main>
            <Route path="/" component={Home} exact />
            <Route path="/jokes" component={Jokes} />
            <Route path="/signup" component={Signup} />
            <Route path="/signin" component={Signin} />
          </main>
        </header>
      </div>
    );
    }

signout = () => {
  localStorage.removeItem('jwt')
  }
}

export default App;
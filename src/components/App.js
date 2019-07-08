import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="navbar">
        <a href="index.html" id="logo">
          <i className="fas fa-coins"></i>Banka
        </a>
        <div id="navbar-right">
          <a href="login.html" className="login-btn">
            Login
          </a>
        </div>
      </div>
    );
  }
}

export default App;

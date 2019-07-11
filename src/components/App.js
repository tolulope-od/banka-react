import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Landing from './layout/Landing';
import Header from './common/Header';
import Footer from './common/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="main">
          <Route exact path="/" component={Landing} />
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;

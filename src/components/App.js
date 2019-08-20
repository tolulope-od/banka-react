import '@babel/polyfill';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux';
import checkToken from '../utils/checkToken';
import './App.css';
import PrivateRoute from './auth/PrivateRoute';
import Landing from './layout/Landing';
import HeaderComponent from './common/Header';
import Footer from './common/Footer';
import LoginComponent from './layout/Login';
import RegisterComponent from './layout/Register';
import SideNavCoponent from './common/SideNav';
import CreateAccountComponent from './layout/CreateAccount';

checkToken();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route component={HeaderComponent} />
          <div className="main">
            <Route exact path="/" component={Landing} />
            <Route component={SideNavCoponent} />
            <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/signup" component={RegisterComponent} />
            <Switch>
              <PrivateRoute exact path="/createaccount" component={CreateAccountComponent} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import WelcomeMessage from '../common/WelcomeMessage';

import moneyProtected from '../../images/money-protected.png';
import saveMoney from '../../images/save-money.png';
import openAccount from '../../images/open-account.png';
import financeImage from '../../images/financeImage.png';

class Landing extends Component {
  render() {
    return (
      <div>
        <div className="content-container">
          <div className="main-content">
            <div className="row">
              <WelcomeMessage
                messageHead="Banking, done right"
                messageBody="Banka is the future of bank accounts management. We employ cutting edge technology
            to improve all facets of your financial life"
                optionalLink={
                  <Link to="/signup" className="auth-btn-side">
                    Get Started
                  </Link>
                }
              />
              <div>
                <img src={financeImage} alt="banking" className="illustration" />
              </div>
            </div>
          </div>
        </div>
        <h4 className="center-text section-head">Your financial partner...</h4>
        <div className="item-content-container description-content">
          <div className="column">
            <img src={openAccount} alt="Open an Account" className="description-img" />
            <p className="center-text description-txt">
              Sign up with us and create a savings or current account
            </p>
          </div>
          <div className="column">
            <img src={saveMoney} alt="Deposit money" className="description-img" />
            <p className="center-text description-txt">
              Proceed to make a deposit at any of our local branches
            </p>
          </div>
          <div className="column">
            <img src={moneyProtected} alt="Your money stays safe" className="description-img" />
            <p className="center-text description-txt">
              Your money stays secure with us against theft or fraud
            </p>
          </div>
        </div>
        <div className="item-content-container action-area">
          <Link to="/signup" className="auth-btn">
            Get Started
          </Link>
          <Link to="/login" className="auth-btn">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;

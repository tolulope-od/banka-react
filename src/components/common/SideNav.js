/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class SideNav extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { pathname } = this.props.history.location;
    const label = pathname.includes('dashboard')
      ? 'DASHBOARD'
      : pathname.includes('account')
      ? 'ACCOUNT'
      : pathname.includes('profile')
      ? 'PROFILE'
      : 'USERS';
    return isAuthenticated ? (
      <div>
        <div className="item-content-container">
          <div className="side-nav">
            <div className="side-nav-content">
              <h5 className={user.type === 'staff' ? 'side-nav-greet-admin' : 'side-nav-greet'}>
                Welcome,
              </h5>
              <h4 className="side-nav-name" id="side-nav-name">
                {user.firstName}
              </h4>
              <Link
                to="/dashboard"
                className="side-link"
                id={pathname.includes('dashboard') ? 'sidelink-active' : null}
              >
                <i className="fas fa-columns"></i> Dashboard
              </Link>
              <Link
                to="/viewaccounts"
                className="side-link"
                id={pathname.includes('account') ? 'sidelink-active' : null}
              >
                <i className="fas fa-file-invoice-dollar"></i> Accounts
              </Link>
              {user.type === 'staff' ? (
                <Link
                  to="/users"
                  className="side-link"
                  id={pathname.includes('user') ? 'sidelink-active' : null}
                >
                  <i className="fas fa-users"></i> Users
                </Link>
              ) : null}
              <Link
                to="/profile"
                className="side-link"
                id={pathname.includes('profile') ? 'sidelink-active' : null}
              >
                <i className="fas fa-user-circle"></i> Profile
              </Link>
            </div>
          </div>
          <div className="item-content-container dashboard">
            <div className="col s5">
              <h2 className="label-lg">
                <strong>{label}</strong>
              </h2>
            </div>
          </div>
        </div>
        <div className="nav-area"></div>
      </div>
    ) : null;
  }
}

SideNav.propTypes = {
  auth: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(SideNav);

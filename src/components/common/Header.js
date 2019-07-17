import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import avatar from '../../images/avatar.png';

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onClick() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  onLogoutClick() {
    this.props.logout();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { pathname } = this.props.history.location;
    const { isOpen } = this.state;
    return isAuthenticated ? (
      <div>
        <div id="navbar" className="menu-nav">
          <Link to="/dashboard" id="logo">
            <i className="fas fa-coins"></i>Banka
          </Link>
          <div id="navbar-right">
            <div className="profile-action" id="drop-down" onClick={this.onClick}>
              <img src={avatar} alt="Profile Picture" className="avatar-img" />
              <i className="fas fa-chevron-down"></i>
            </div>
          </div>
        </div>
        <div
          className={isOpen ? 'profile-dropdown-active' : 'profile-dropdown'}
          id="dropdown-contents"
        >
          <Link
            to="/dashboard"
            className="dropdown-item profile"
            id={pathname.includes('dashboard') ? 'active' : 'inactive'}
          >
            <i className="fas fa-columns icon"></i> Dashboard
          </Link>

          <Link
            to="/viewaccounts"
            className="dropdown-item profile"
            id={pathname.includes('account') ? 'active' : 'inactive'}
          >
            <i className="fas fa-file-invoice-dollar icon"></i> Accounts
          </Link>
          {user.type === 'client' ? null : (
            <Link
              to="/users"
              className="dropdown-item profile"
              id={pathname.includes('user') ? 'active' : 'inactive'}
            >
              <i className="fas fa-users icon"></i> Users
            </Link>
          )}
          <Link
            to="/profile"
            className="dropdown-item profile"
            id={pathname.includes('profile') ? 'active' : 'inactive'}
          >
            <i className="fas fa-user-circle icon"></i> Profile
          </Link>
          <Link to="/" className="dropdown-item" id="logout-btn" onClick={this.onLogoutClick}>
            <i className="fas fa-sign-out-alt icon"></i>Logout
          </Link>
        </div>
      </div>
    ) : (
      <div id="navbar">
        <Link to="/" id="logo">
          <i className="fas fa-coins"></i>Banka
        </Link>
        <div id="navbar-right">
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);

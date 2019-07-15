import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WelcomeMessage from '../common/WelcomeMessage';
import Input from '../common/Input';
import Loading from '../common/Loading';
import { signUp } from '../../redux/actions/authActions';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      passwordMatchError: {}
    };
    this.onChange = this.onChange.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  onChange(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { firstName, lastName, email, password, password2 } = this.state;
    this.setState({ passwordMatchError: {} });
    if (password !== password2) {
      return this.setState({ passwordMatchError: { status: 401, error: 'Passwords must match' } });
    }
    const userData = { firstName, lastName, email, password };
    return this.props.signUp(userData, this.props.history);
  }

  renderLoading() {
    const { loading } = this.props.auth;
    const loadingGIF = loading ? <Loading /> : null;
    const signUpBtn = loading ? (
      <Input
        type="submit"
        name="signUp"
        id="login-btn"
        value="LOADING...."
        className="btn-active"
        disabled={true}
      />
    ) : (
      <Input
        type="submit"
        name="signUp"
        id="login-btn"
        value="SIGN UP"
        className="button-active"
        disabled={false}
      />
    );

    return { loadingGIF, signUpBtn };
  }

  render() {
    const { errors, passwordMatchError } = this.state;
    const { loadingGIF, signUpBtn } = this.renderLoading();
    return (
      <div className="content-container body-main">
        <div className="main-content">
          <div className="row">
            <WelcomeMessage
              messageHead="Banking, done right"
              messageBody="Sign up and get started"
            />
            <div>
              <div className="form-card">
                <h1 className="signup-login-text">Sign up</h1>
                <div className="form-body">
                  <form className="sign-up-form" onSubmit={this.onSubmit}>
                    <br />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      id="first-name"
                      value={this.state.firstName}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      id="last-name"
                      value={this.state.lastName}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      id="user-signup-email"
                      value={this.state.email}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      id="user-signup-password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <Input
                      type="password"
                      name="password2"
                      placeholder="Confirm Password"
                      id="confirm-password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <div className="input-field-button">{signUpBtn}</div>
                    <br />
                    <div className="errors">
                      <p className="auth-error-text" id="login-error">
                        {passwordMatchError.error}
                        {errors.error}
                      </p>
                      {loadingGIF}
                    </div>
                    <br />
                    <div className="forgot-password">
                      <Link to="/forgotPassword">Forgot Password?</Link>
                    </div>
                    <div className="signup-login-link">
                      <p>
                        Have an account? <Link to="/login">Login</Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  signUp: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { signUp }
)(Register);

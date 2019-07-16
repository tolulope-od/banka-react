import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import WelcomeMessage from '../common/WelcomeMessage';
import Input from '../common/Input';
import Loading from '../common/Loading';
import { login } from '../../redux/actions/authActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors !== prevState.errors) {
      return { errors: nextProps.errors };
    }

    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push('/dashboard');
      return null;
    }
    return null;
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onChange(e) {
    return this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const userData = { email, password };
    this.props.login(userData);
  }

  renderLoading() {
    const { loading } = this.props.auth;
    const loadingGIF = loading ? <Loading /> : null;
    const loginBtn = loading ? (
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
        value="LOGIN"
        className="button-active"
        disabled={false}
      />
    );

    return { loadingGIF, loginBtn };
  }

  render() {
    const { errors } = this.state;
    const { loadingGIF, loginBtn } = this.renderLoading();
    return (
      <div className="content-container body-main">
        <div className="main-content">
          <div className="row">
            <WelcomeMessage
              messageHead="Banking, done right"
              messageBody="Welcome back, we missed you"
            />
            <div>
              <div className="form-card">
                <h1 className="signup-login-text">Log In</h1>
                <div className="form-body">
                  <form className="sign-up-form" onSubmit={this.onSubmit}>
                    <br />
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      id="user-email"
                      value={this.state.email}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      id="user-password"
                      value={this.state.password}
                      onChange={this.onChange}
                      required={true}
                    />
                    <br />
                    <div className="input-field-button">{loginBtn}</div>
                    <br />
                    <div className="errors">
                      <p className="auth-error-text" id="login-error">
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
                        Don&apos;t have an account? <Link to="/signup">Register</Link>
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { login }
)(Login);

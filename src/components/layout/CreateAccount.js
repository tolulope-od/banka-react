import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../common/Modal';
import Card from '../common/Card';
import Input from '../common/Input';
import ErrorMessage from '../common/ErrorMessage';
import createBankAccount from '../../redux/actions/accountActions';
import isEmpty from '../../utils/isEmpty';

import loadingGIF from '../../images/loading.gif';

export class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      type: null,
      account: {},
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.modalDisplay = this.modalDisplay.bind(this);
  }

  onChange(e) {
    this.setState({ type: e.target.value });
  }

  onClick(e) {
    if (
      e.target.id === 'close-button' ||
      e.target.id === 'myModal' ||
      e.target.id === 'submit-btn'
    ) {
      this.setState({ isOpen: false });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ error: '' });
    const { type } = this.state;
    return this.props.createBankAccount(type);
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps.account !== newProps.account) {
      this.setState({ account: newProps.account.account });
    }

    if (oldProps.errors !== newProps.errors) {
      this.setState({ errors: newProps.errors, isOpen: true });
    }
  }

  modalDisplay() {
    const { isOpen } = this.state;
    const { errors } = this.state;
    const modalSuccess = (
      <div>
        {this.props.account.accountLoading ? (
          <img src={loadingGIF} alt="loading" width="200" />
        ) : (
          <div>
            {' '}
            <img
              src="https://res.cloudinary.com/tolulope-od/image/upload/v1563465309/checkmark_cantmu.gif"
              width="200"
            />
            <h2>Account Created Successfully</h2>
            <Input
              type="submit"
              className="accnt-create-btn"
              name="addAccount"
              value="OK"
              id="submit-btn"
            />{' '}
          </div>
        )}
      </div>
    );
    const modal = isOpen ? (
      <Modal
        onClick={this.onClick}
        modalContent={
          <center>
            {!isEmpty(errors.error) ? <ErrorMessage errors={errors} /> : modalSuccess}
          </center>
        }
        className="modal-open"
      />
    ) : null;

    return modal;
  }

  render() {
    const { user } = this.props.auth;
    const modal = this.modalDisplay();
    const accountForm = (
      <form onSubmit={this.onSubmit} className="add-account">
        First name:
        <Input
          type="text"
          name="firstName"
          value={user.firstName}
          id="account-first-name"
          disabled={true}
        />
        <br />
        Last name:
        <Input
          type="text"
          name="lastName"
          value={user.lastName}
          id="account-last-name"
          disabled={true}
        />
        <br />
        <select
          name="accountType"
          className="account-type"
          id="account-type"
          onChange={this.onChange}
        >
          <option value="" className="default-slct">
            -- Select an account type
          </option>
          <option value="current" className="current-acct">
            Current
          </option>
          <option value="savings" className="savings-acct">
            Savings
          </option>
        </select>
        <Input
          type="submit"
          className="accnt-create-btn"
          name="addAccount"
          value="Submit"
          id="submit-btn"
        />
      </form>
    );
    return (
      <div>
        <div className="shortcut-btns">
          <Link to="/dashboard">
            <i className="fas fa-chevron-left"></i> Dashboard
          </Link>
        </div>
        <div className="main-dashboard">
          <div className="account-stats">
            <Card cardContent={accountForm} />
          </div>
        </div>
        {modal}
      </div>
    );
  }
}

CreateAccount.propTypes = {
  auth: PropTypes.object.isRequired,
  account: PropTypes.object,
  createBankAccount: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  account: state.account
});

export default connect(
  mapStateToProps,
  { createBankAccount }
)(CreateAccount);

import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Card from '../common/Card';
import Modal from '../common/Modal';
import ErrorMessage from '../common/ErrorMessage';
import { fetchBankAccounts } from '../../redux/actions/accountActions';
import loadingGIF from '../../images/loading.gif';
import isEmpty from '../../utils/isEmpty';
import formatNumber from '../../utils/formatNumber';

export class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      isOpen: false,
      errors: {}
    };
    this.onClick = this.onClick.bind(this);
  }

  async componentDidMount() {
    try {
      const accounts = await this.props.fetchBankAccounts();
      this.setState({ accounts });
    } catch (e) {
      this.setState({ errors: { error: 'Something unusual happened, please try again' } });
    }
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

  render() {
    const { isOpen, accounts } = this.state;
    let cardContent;
    return (
      <Fragment>
        {this.props.auth.user.type === 'client' ? (
          <div className="shortcut-btns">
            <Link to="/createaccount">+ Add Account</Link>
          </div>
        ) : null}
        {this.props.account.accountLoading ? (
          <Modal
            modalContent={
              <center>
                <img src={loadingGIF} alt="loading" />
              </center>
            }
            className={isOpen ? 'modal-open' : 'modal'}
            onClick={this.onClick}
          />
        ) : (
          <div className="main-dashboard">
            <div className="account-stats" id="accnt-stats">
              {accounts.length > 0 ? (
                accounts.map(account => {
                  cardContent = (
                    <Fragment>
                      {account.status === 'active' ? (
                        <p className="badge-active" id="accnt-status">
                          {account.status}
                        </p>
                      ) : (
                        <p className="badge-inactive" id="accnt-status">
                          {account.status}
                        </p>
                      )}
                      <p className="balance-text">Balance</p>
                      <h3 className="account-balance" id="accnt-balance">
                        &#x20A6; {formatNumber(parseFloat(account.balance).toFixed(2))}
                      </h3>
                      <p className="balance-text">Account Number</p>
                      <h3 className="account-balance" id="accnt-number">
                        {account.accountnumber}
                      </h3>
                      <p className="balance-text">Account Type</p>
                      <h3 className="account-balance" id="accnt-type">
                        {account.type}
                      </h3>
                      <a
                        href="accountinfo.html"
                        className="accnt-info-btn"
                        data-account-number={account.accountnumber}
                      >
                        View Details
                      </a>
                    </Fragment>
                  );
                  return <Card key={account.id} cardContent={cardContent} />;
                })
              ) : (
                <h1>You Have No Accounts At This Time....</h1>
              )}
            </div>
          </div>
        )}
        {!isEmpty(this.props.errors.error) ? (
          <Modal
            className={isOpen ? 'modal-open' : 'modal'}
            modalContent={<ErrorMessage errors={{ error: 'An error occured, please try again' }} />}
            onClick={this.onClick}
          />
        ) : null}
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object,
  account: PropTypes.object.isRequired,
  fetchBankAccounts: PropTypes.func.isRequired,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  account: state.account
});

export default connect(
  mapStateToProps,
  { fetchBankAccounts }
)(Dashboard);

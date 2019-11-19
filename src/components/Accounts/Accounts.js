import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from '../../copy';
import { DATE_FORMAT } from '../../constants';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';

const propTypes = {
  copy: PropTypes.shape({}),
};

const defaultProps = {
  copy: {},
};

let accounts = [];

class Accounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoadingAccounts: true,
      isDownloadProcessing:false,
      accountData: []
    };
  }

  async componentDidMount() {
    const { callApi } = this.props;
    await callApi("accounts")
      .then(function(data) {
        accounts = [];
        data.forEach(account => {
          accounts.push(account);
        })
      })
      .catch(err => console.log(err));
    setTimeout(() => {
      this.setState({
        isLoadingAccounts: false,
        accountData: accounts
      })
    }, 500);
  }

  render() {
    const { accountData, isLoadingAccounts } = this.state;
    return (
      <>
        {!isLoadingAccounts ?
        <div className="content">
          <h2>{copy.menu.accounts}</h2>
          <table className="table">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Code</th>
              <th>Name</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
          {
            (accountData && accountData.length > 0 ?
              accountData.map((account) => {
              return (
                <tr key={account.AccountID}>
                  <td>{account.AccountID}</td>
                  <td>{account.Code}</td>
                  <td>{account.Name}</td>
                  <td>{account.Status}</td>
                  <td>
                    <Moment format={DATE_FORMAT} date={account.UpdatedDateUTC} />
                  </td>
                </tr>
              );
            })
            :<tr><td colSpan="4">No Accounts found, Please<Link to="/sync">Sync</Link>data first.</td></tr>)
          }
          </tbody>
        </table>
        </div>
        : <Loader></Loader>
        }
      </>
    );
  }
}

Accounts.propTypes = propTypes;
Accounts.defaultProps = defaultProps;
export default Accounts;
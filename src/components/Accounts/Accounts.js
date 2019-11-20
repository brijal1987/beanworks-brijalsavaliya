import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from '../../copy';
import { DATE_FORMAT } from '../../constants';
import Moment from 'react-moment';
import { Link } from "react-router-dom";
import Loader from '../Loader/Loader';
import { CSVLink } from "react-csv";
import { ButtonToolbar, Button } from "react-bootstrap";

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
    this.downloadAccounts = this.downloadAccounts.bind(this);

    this.state = {
      isLoadingAccounts: true,
      isDownloadProcessing:false,
      accountData: [],
      errorMessage: "",
    };
  }

  async componentDidMount() {
    const { callApi } = this.props;
    let error = "";
    await callApi("accounts")
      .then(function(data) {
        accounts = [];

        if(data.code==="ER_BAD_FIELD_ERROR"){
          error = copy.errorMessage;
        }else{
          data.forEach(account => {
            accounts.push(account);
          })
        }
      })
      .catch(err => console.log(err));
    setTimeout(() => {
      if(error){
        this.setState({
          errorMessage: copy.errorMessage
        })
      }
      this.setState({
        isLoadingAccounts: false,
        accountData: accounts
      })
    }, 500);
  }

  downloadAccounts(){
    const { downloadFile } = this.props;
    const { accountData } = this.state;

    downloadFile(JSON.stringify(accountData), 'account-data.json');
  }

  render() {
    const { accountData, isLoadingAccounts, errorMessage } = this.state;
    if(errorMessage) {
      return (
        <div className="content">
          <div className="warning">{errorMessage}</div>
        </div>
      );
    }
    return (
      <>
        {!isLoadingAccounts ?
        <div className="content">
          <h2>{copy.menu.accounts}</h2>
          <ButtonToolbar>
            <CSVLink 
            filename={"accounts-data-file.csv"}
            className="csv btn btn-primary"
            data={accountData}>Download Accounts to CSV</CSVLink>
            &nbsp;
            <Button
              onClick={this.downloadAccounts}
              variant="info"
            >
              Download Json Data
            </Button>

          </ButtonToolbar>
          <hr></hr>
            
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
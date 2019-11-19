import React from 'react';
import PropTypes from 'prop-types';
import copy from '../../copy';
import { DATE_FORMAT } from '../../constants';
import Moment from 'react-moment';
import { Link } from "react-router-dom";

const propTypes = {
  copy: PropTypes.shape({}),
};

const defaultProps = {
  copy: {},
};

let vendors = [];

class Vendors extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingAccounts: true,
      vendorData: []
    };
  }

  componentDidMount() {
    const { callApi } = this.props;
    callApi("contacts")
      .then(function(data) {
        vendors = [];
        data.forEach(vendor => {
          vendors.push(vendor);
        })
      })
      .catch(err => console.log(err));
      setTimeout(() => {
        console.log('Our Vendor data is fetched');
        this.setState({
          isLoadingVendors: false
        })
        this.setState({
          vendorData: vendors
        })
      }, 2000);
  }

  render() {
    const { vendorData, isLoadingVendors } = this.state;
    return (
      <>
        {!isLoadingVendors ?
        <div className="content">
          <h2>{copy.menu.vendors}</h2>
          <table className="table">
          <thead>
            <tr>
              <th>Account ID</th>
              <th>Account Number</th>
              <th>Name</th>
              <th>Status</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
          {
            (vendorData && vendorData.length > 0 ?
              vendorData.map((vendor) => {
              return (
                <tr key={vendor.id}>
                  <td>{vendor.ContactID}</td>
                  <td>{vendor.AccountNumber}</td>
                  <td>{vendor.Name}</td>
                  <td>{vendor.ContactStatus}</td>
                  <td>
                    <Moment format={DATE_FORMAT} date={vendor.UpdatedDateUTC} />
                  </td>
                </tr>
              );
            })
            :<tr><td colSpan="4">No Vendors found, Please<Link to="/sync">Sync</Link>data first.</td></tr>)
          }
          </tbody>
        </table>
        </div>
        : <h3 className="loading">Loading...</h3>
        }
      </>
    );
  }
}

Vendors.propTypes = propTypes;
Vendors.defaultProps = defaultProps;
export default Vendors;
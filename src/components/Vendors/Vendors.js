import React from 'react';
import PropTypes from 'prop-types';
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

let vendors = [];

class Vendors extends React.Component {

  constructor(props) {
    super(props);
    this.downloadVendors = this.downloadVendors.bind(this);

    this.state = {
      isLoadingVendors: true,
      vendorData: [],
      errorMessage: "",
    };
  }

  componentDidMount() {
    const { callApi, copy } = this.props;
    let error = "";
    callApi("contacts")
      .then(function(data) {
        vendors = [];
        if(data.code==="ER_BAD_FIELD_ERROR"){
          error = copy.errorMessage;
        }else{
          data.forEach(vendor => {
            vendors.push(vendor);
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
          isLoadingVendors: false,
          vendorData: vendors
        })
      }, 500);
  }

  downloadVendors(){
    const { downloadFile } = this.props;
    const { vendorData } = this.state;

    downloadFile(JSON.stringify(vendorData), 'vendor-data.json');

  }

  render() {
    const { copy } = this.props;

    const { vendorData, isLoadingVendors, errorMessage } = this.state;
    if(errorMessage) {
      return (
        <div className="content">
          <div className="warning">{errorMessage}</div>
        </div>
      );
    }
    return (
      <>
        {!isLoadingVendors ?
        <div className="content">
          <h2>{copy.menu.vendors}</h2>
          <ButtonToolbar>
            <CSVLink 
            filename={"vendors-data-file.csv"}
            className="csv btn btn-primary"
            data={vendorData}>Download Vendors to CSV</CSVLink>
            &nbsp;
            <Button
              onClick={this.downloadVendors}
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
        : <Loader></Loader>
        }
      </>
    );
  }
}

Vendors.propTypes = propTypes;
Vendors.defaultProps = defaultProps;
export default Vendors;
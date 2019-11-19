import React, { Component } from "react";
import PropTypes from "prop-types";
import copy from "../../copy";
import { DATE_FORMAT } from "../../constants";
import Moment from "react-moment";
import { ButtonToolbar, Button } from "react-bootstrap";
import Loader from '../Loader/Loader';

const propTypes = {
  copy: PropTypes.shape({})
};

const defaultProps = {
  copy: {}
};

let syncData = [];

class Accounts extends Component {
  constructor(props) {
    super(props);
    this.syncData = this.syncData.bind(this);
    this.deleteData = this.deleteData.bind(this);

    this.state = {
      defaultloadLogs: false ,
      isLoadingSyncData: true,
      isLoadingLogsData: true,
      isSyncProcessing: false,
      sData: [],
      sLogsData: []
    };
    this.selectTr = React.createRef();
  }

  async componentDidMount() {
    this.getSyncData();
  }

  async getSyncData(Parent = 0) {
    const { callApi } = this.props;
    await callApi("getSyncData", "logs", Parent)
      .then(function(data) {
        syncData = [];
        data.forEach(s => {
          syncData.push(s);
        });
      })
      .catch(err => console.log(err));
    if (Parent) {
      setTimeout(() => {
        this.setState({
          isLoadingLogsData: false,
          sLogsData: syncData
        });
      }, 500);
    } else {
      this.setState({
        isLoadingSyncData: false,
        isSyncProcessing: false,
        sData: syncData
      });
    }
  }

  async onClickLoadLogs(e, id) {
    let el = document.getElementsByClassName("logRaw");
    for (var i = 0; i < el.length; i++) {
      el[i].classList.remove("active");
      console.log(el[i].classList);
    }

    e.target.parentNode.parentNode.classList.add("active");
    this.getSyncData(id);

    this.setState({
      isLoadingLogsData: true,
      defaultloadLogs: true
    });
  }

  async syncData() {
    const { callApi } = this.props;

    this.setState({
      isSyncProcessing: true,
      defaultloadLogs: false
    });
    await callApi("syncData").catch(err => console.log(err));
    this.getSyncData();
  }

  async deleteData() {
    const { callApi } = this.props;

    this.setState({
      isSyncProcessing: true,
      defaultloadLogs: false
    });
    await callApi("deleteData").catch(err => console.log(err));
    this.getSyncData();
  }

  render() {
    const {
      sData,
      sLogsData,
      isLoadingSyncData,
      isLoadingLogsData,
      isSyncProcessing,
      defaultloadLogs
    } = this.state;
    return (
      <>
        {!isLoadingSyncData ? (
          <div className="content">
            <h2>{copy.menu.data_management}</h2>
            <ButtonToolbar>
              <Button
                disabled={isSyncProcessing}
                onClick={this.syncData}
                variant="info"
              >
                Sync
              </Button>
              &nbsp;
              <Button
                disabled={isSyncProcessing}
                onClick={this.deleteData}
                variant="danger"
              >
                Delete Data
              </Button>
            </ButtonToolbar>
            <hr></hr>
            <div className="row">
              <div className="col-md-5 box mainbox">
                {!isSyncProcessing ? (
                  <>
                    <h2>{copy.menu.sync_activity}</h2>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Sync Type</th>
                          <th>Sync By</th>
                          <th>Sync Status</th>
                          <th>Sync ON</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sData && sData.length > 0 ? (
                          sData.map(sync => {
                            return (
                              <tr
                                ref={this.selectTr}
                                id={["logRaw", sync.id].join(" ")}
                                className="logRaw"
                                key={sync.id}
                              >
                                <td>{sync.SyncType}</td>
                                <td>{sync.SyncBy}</td>
                                <td>{sync.Status}</td>
                                <td>
                                  <Moment
                                    format={DATE_FORMAT}
                                    date={sync.SyncOn}
                                  />
                                </td>
                                <td>
                                  <span
                                    className="link"
                                    onClick={e =>
                                      this.onClickLoadLogs(e, sync.id)
                                    }
                                  >
                                    Logs
                                  </span>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="4">No Records found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <Loader></Loader>
                )}
              </div>
              <div className="col-md-5 box mainbox">
                {!defaultloadLogs ? (
                  <h2>Please load logs by clicking on logs action.</h2>
                ) : !isLoadingLogsData ? (
                  <div className="inner log">
                    <h2>{copy.menu.sync_log}</h2>
                    <h5>SYNC INITIATED BY</h5>
                    <h6>
                      {sLogsData && sLogsData.length > 0
                        ? sLogsData[0].SyncBy
                        : "N/A"}
                    </h6>
                    <h5>SYNCTOOL LOGS</h5>
                    <div className="log">
                      <table border="1" className="table">
                        <tbody>
                          {sLogsData && sLogsData.length > 0 ? (
                            sLogsData.map(syncLog => {
                              return (
                                <tr key={syncLog.id}>
                                  <td>{syncLog.Message}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="4">No Sync Log Yet</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <Loader></Loader>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader></Loader>
        )}
      </>
    );
  }
}

Accounts.propTypes = propTypes;
Accounts.defaultProps = defaultProps;
export default Accounts;

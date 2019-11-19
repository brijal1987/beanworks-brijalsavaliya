import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header  from './components/Header/Header';
import Sidebar  from './components/Sidebar/Sidebar';
import Home  from './components/Home/Home';
import Sync  from './components/Sync/Sync';
import Vendors  from './components/Vendors/Vendors';
import Accounts  from './components/Accounts/Accounts';
import copy from './copy';
import { API_URL } from './constants';
import Loader from './components/Loader/Loader';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    setTimeout(this.setState({ isLoading: false }), 5000);
  }

  async callApi(link, type = "", parentID=0) {
    let response;
    if(type)
      response = await fetch(`${API_URL}/${link}/${parentID}`);
    else
      response = await fetch(`${API_URL}/${link}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {

    const { isLoading } = this.state;

    return (
      <Router>
        <div className="App" id="main">
          <Header copy={copy}></Header>
          <div className="row">
            <div className="col-md-2 box">
              <div className="inner">
                <Sidebar copy={copy}></Sidebar>
              </div>
            </div>
            <div className="col-md-10 main box">
              <div className="inner">
                <Switch data="data">
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <>
                      {!isLoading ?
                      <Home
                        {...props}
                        copy={copy}
                        {...this.state} />
                      : <Loader></Loader>
                      }
                        </>
                    )}
                  />
                  <Route
                    exact
                    path="/sync"
                    render={props => (
                      <Sync
                        callApi={this.callApi}
                        {...props}
                        copy={copy} />
                    )}
                  />
                  <Route
                    exact
                    path="/vendors"
                    render={props => (
                      <Vendors
                        callApi={this.callApi}
                        {...props}
                        copy={copy} />
                    )}
                  />
                  <Route
                    exact
                    path="/accounts"
                    render={props => (
                      <Accounts
                        callApi={this.callApi}
                        {...props}
                        copy={copy} />
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App
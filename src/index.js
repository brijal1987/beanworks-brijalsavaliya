import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from "react-dom";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, withRouter } from "react-router-dom";


const AppContainer = withRouter(props => <App {...props} />);
// console.log(store.getState())
render(
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>,

  document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

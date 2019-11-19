import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.scss';
import { Link } from "react-router-dom";

const propTypes = {
  copy: PropTypes.shape({}),
};

const defaultProps = {
  copy: {},
};
class Sidebar extends React.Component {

  render() {
    const { copy } = this.props;

    return (
      <div>
          <ul>
            <li>
              <Link to="/">{copy.menu.dashboard}</Link>
            </li>
            <li>
              <Link to="/sync">{copy.menu.data_management}</Link>
            </li>
            <li>
              <Link to="/vendors">{copy.menu.vendors}</Link>
            </li>
            <li>
              <Link to="/accounts">{copy.menu.accounts}</Link>
            </li>
          </ul>
      </div>
    );
  }
}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;
export default Sidebar;
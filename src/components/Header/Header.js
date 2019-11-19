import React from 'react';
import PropTypes from 'prop-types';
import Top from '../Top/Top';

const propTypes = {
  copy: PropTypes.shape({}),
};

const defaultProps = {
  copy: {},
};

class Header extends React.Component {

  render() {
    const { copy } = this.props;

    return (
      <header>
        <Top copy={copy}></Top>
      </header>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
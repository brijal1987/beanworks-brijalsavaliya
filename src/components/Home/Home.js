import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

const propTypes = {
  copy: PropTypes.shape({}),
};

const defaultProps = {
  copy: {},
};
class Home extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
    }
  }
  */

  render() {
    const { copy } = this.props;
    // const { posts } = this.state;
    return (
      <div className="content">
        <h2>{copy.menu.dashboard}</h2>
      </div>
    );
  }
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
import React from 'react';
import PropTypes from 'prop-types';
import './Top.scss';

const propTypes = {
  copy: PropTypes.shape({}),
};

const defaultProps = {
  copy: {},
};

class Top extends React.Component {

  render() {
    const { copy } = this.props;

    return (
      <div className="jumbotron">
        <h1>{copy.project_title} <small>{copy.project_tagline}</small></h1>
      </div>
    );
  }
}

Top.propTypes = propTypes;
Top.defaultProps = defaultProps;
export default Top;
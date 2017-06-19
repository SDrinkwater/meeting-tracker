import React from 'react';
import PropTypes from 'prop-types';

import colors from '../colors';

const styles = {
  container: {
    position: 'relative',
    backgroundColor: colors.primary,
    padding: '0px, 20px',
  },
  title: {
    position: 'relative',
    display: 'block',
    margin: '0px',
    padding: '10px',
    color: colors.lightText,
  },
};

const Header = props => (
  <div style={styles.container}>
    <h1 style={styles.title}>
      {props.title}
    </h1>
  </div>
  );

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: '',
};

export default Header;

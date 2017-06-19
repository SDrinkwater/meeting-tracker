import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { removeMeetingById, toggleMeeting, resetMeeting } from '../actions';

import Timer from '../components/Timer';
import Title from '../components/Title';

const styles = {
  container: {
    padding: '8px',
    margin: '24px',
    textAlign: 'center',
    width: '272px',
  },
  header: {
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    padding: '0px',
    width: '24px',
    height: '24px',
  },
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeMeetingById, toggleMeeting, resetMeeting }, dispatch),
});

const MeetingCard = props => (
  <Paper style={styles.container}>
    <div style={styles.header}>
      <Title />
      <IconButton
        style={styles.close}
        onClick={() => props.actions.removeMeetingById(props.id)}
      >
        <NavigationClose />
      </IconButton>
    </div>
    <Timer toggle={props.actions.toggleMeeting} reset={props.actions.resetMeeting} />
  </Paper>
);

MeetingCard.propTypes = {
  actions: PropTypes.shape({
    toggleMeeting: PropTypes.func,
    removeMeetingById: PropTypes.func,
    resetMeeting: PropTypes.func,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(MeetingCard);

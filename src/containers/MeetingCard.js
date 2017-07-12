import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import {
  removeMeetingById,
  startMeeting,
  stopMeeting,
  resetMeeting,
  setMeetingTitle,
  setMeetingAttendees,
} from '../actions/meetings';

import Timer from '../components/Timer';
import Title from '../components/Title';

const styles = {
  container: {
    position: 'relative',
    padding: '8px',
    margin: '24px',
    textAlign: 'center',
    width: '272px',
    userSelect: 'none',
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
  attendees: {
    position: 'absolute',
    left: '0px',
  },
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeMeetingById,
    startMeeting,
    stopMeeting,
    resetMeeting,
    setMeetingTitle,
    setMeetingAttendees,
  }, dispatch),
});

const MeetingCard = props => (
  <Paper style={styles.container}>
    <div style={styles.header}>
      <Title
        id={props.id}
        setTitle={props.actions.setMeetingTitle}
        value={props.meeting.title}
      />
      <IconButton
        style={styles.close}
        onClick={() => {
          props.actions.removeMeetingById(props.id);
        }}
      >
        <NavigationClose />
      </IconButton>
    </div>
    <Timer
      id={props.id}
      play={props.meeting.play}
      reset={props.actions.resetMeeting}
      start={props.actions.startMeeting}
      stop={props.actions.stopMeeting}
      timer={props.timer}
      attendees={props.meeting.attendees}
      setMeetingAttendees={props.actions.setMeetingAttendees}
    />
  </Paper>
);

MeetingCard.propTypes = {
  id: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    removeMeetingById: PropTypes.func,
    resetMeeting: PropTypes.func,
    setMeetingAttendees: PropTypes.func,
    setMeetingTitle: PropTypes.func,
    startMeeting: PropTypes.func,
    stopMeeting: PropTypes.func,
  }).isRequired,
  meeting: PropTypes.shape({
    attendees: PropTypes.number,
    play: PropTypes.bool,
    title: PropTypes.string,
  }).isRequired,
  timer: PropTypes.shape({
    baseTime: PropTypes.number,
    startedAt: PropTypes.number,
    stoppedAt: PropTypes.number,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(MeetingCard);

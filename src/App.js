import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import uuid from 'uuid/v1';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';

import { addMeeting, removeMeeting } from './actions';
import MeetingCard from './containers/MeetingCard';

const styles = {
  header: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: '120px',
  },
  toolbar: {
    paddingLeft: '32px',
    userSelect: 'none',
  },
};

const maptStateToProps = state => ({
  meetings: state.meetings,
});

const maptDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addMeeting, removeMeeting }, dispatch),
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetings: [],
    };

    this.addMeeting = this.addMeeting.bind(this);
    this.removeMeeting = this.removeMeeting.bind(this);
  }

  addMeeting() {
    this.props.actions.addMeeting(uuid());
  }

  removeMeeting() {
    this.props.actions.removeMeeting();
  }


  render() {
    const meetings = this.props.meetings.meetings.map(meeting => (
      <MeetingCard key={meeting.id} id={meeting.id} />
    ));

    return (
      <div>
        <div style={styles.header}>
          <AppBar
            title="Meeting tracker"
            iconElementRight={<FlatButton label="Save" />}
          />
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup firstChild>
              <MenuItem primaryText="Add" onClick={this.addMeeting} />
              <MenuItem primaryText="Remove" onClick={this.removeMeeting} />
            </ToolbarGroup>
          </Toolbar>
        </div>
        <div style={styles.content}>
          {meetings}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    addMeeting: PropTypes.func,
    removeMeeting: PropTypes.func,
  }).isRequired,
  meetings: PropTypes.shape({ meetings: PropTypes.arrayOf(PropTypes.object) }).isRequired,
};

export default connect(maptStateToProps, maptDispatchToProps)(App);

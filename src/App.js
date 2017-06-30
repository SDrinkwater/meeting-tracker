import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import uuid from 'uuid/v1';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup } from 'material-ui';

import { addMeeting } from './actions/meetings';
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
  meetings: state.meetings.toJS(),
  timers: state.timers.toJS(),
});

const maptDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addMeeting }, dispatch),
});

class App extends Component {
  addMeeting = () => {
    const id = uuid();
    this.props.actions.addMeeting(id);
  }

  render() {
    const meetings = _.mapValues(this.props.meetings, (meeting, key) => {
      const timer = this.props.timers[key];
      return (
        <MeetingCard
          key={key}
          id={key}
          meeting={meeting}
          timer={timer}
        />
      );
    });

    return (
      <div>
        <div style={styles.header}>
          <AppBar title="Meeting tracker" />
          <Toolbar style={styles.toolbar}>
            <ToolbarGroup firstChild>
              <MenuItem primaryText="Add" onClick={this.addMeeting} />
            </ToolbarGroup>
          </Toolbar>
        </div>
        <div style={styles.content}>
          {Object.values(meetings)}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    addMeeting: PropTypes.func,
  }).isRequired,
  meetings: PropTypes.shape({}).isRequired,
  timers: PropTypes.shape({}).isRequired,
};

// Needed for onTouchTap
injectTapEventPlugin();

export default connect(maptStateToProps, maptDispatchToProps)(App);

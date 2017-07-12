import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import uuid from 'uuid/v1';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup } from 'material-ui';

import { addMeeting, moveMeeting } from './actions/meetings';
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

const SortableItem = SortableElement(({ value }) => <div>{value}</div>);
const SortableList = SortableContainer(({ items }) => (
  <div style={styles.content}>
    {items.map((value, index) =>
      <SortableItem key={value.key} index={index} value={value} />,
    )}
  </div>
));

// Remove toJS from mapStateToProps
const maptStateToProps = state => ({
  meetings: state.meetings.toJS(),
  timers: state.timers.toJS(),
});

const maptDispatchToProps = dispatch => ({
  actions: bindActionCreators({ addMeeting, moveMeeting }, dispatch),
});

class App extends Component {
  addMeeting = () => {
    const id = uuid();
    this.props.actions.addMeeting(id);
  }
  render() {
    const meetings = _.map(this.props.meetings, (meeting, index) => {
      const timer = this.props.timers[index];
      return (
        <MeetingCard
          key={index}
          id={index}
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
              <MenuItem primaryText="Add" onClick={this.props.actions.addMeeting} />
            </ToolbarGroup>
          </Toolbar>
        </div>
        <SortableList
          axis="xy"
          items={Object.values(meetings)}
          onSortEnd={({ oldIndex, newIndex }) => this.props.actions.moveMeeting(oldIndex, newIndex)}
          distance={25}
        />
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.shape({
    addMeeting: PropTypes.func,
    moveMeeting: PropTypes.func,
  }).isRequired,
  meetings: PropTypes.arrayOf(PropTypes.object).isRequired,
  timers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Needed for onTouchTap
injectTapEventPlugin();

export default connect(maptStateToProps, maptDispatchToProps)(App);

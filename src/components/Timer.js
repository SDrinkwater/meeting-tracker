import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import getElapsedTime from '../utils/getElapsedTime';
import secondsTohhmmss from '../utils/secondsTohhmmss';

const styles = {
  time: {
    fontSize: '48px',
  },
  button: {
    margin: 12,
  },
};

class Timer extends Component {
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggle = (elapsed) => {
    if (this.props.play) {
      this.props.stop(this.props.timer.id);
      clearInterval(this.interval);
    } else {
      this.props.start(this.props.timer.id, elapsed);
      this.interval = setInterval(this.forceUpdate.bind(this), 333);
    }
  };

  render() {
    const { baseTime, startedAt, stoppedAt } = this.props.timer;
    const elapsed = getElapsedTime(baseTime, startedAt, stoppedAt);
    const hhmmss = secondsTohhmmss(elapsed > 1000 ? Math.floor(elapsed / 1000) : 0);

    return (
      <div>
        <div style={styles.time}>
          {hhmmss}
        </div>
        <RaisedButton
          label={this.props.play ? 'Stop' : 'Start'}
          primary={!this.props.play}
          secondary={this.props.play}
          style={styles.button}
          onClick={() => this.toggle(elapsed)}
        />
        <RaisedButton
          label="Reset"
          style={styles.button}
          onClick={() => this.props.reset(this.props.timer.id)}
        />
      </div>
    );
  }
}

Timer.propTypes = {
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  play: PropTypes.bool.isRequired,
  timer: PropTypes.shape({
    id: PropTypes.string,
    baseTime: PropTypes.number,
    startedAt: PropTypes.number,
    stoppedAt: PropTypes.number,
  }).isRequired,
};

export default Timer;

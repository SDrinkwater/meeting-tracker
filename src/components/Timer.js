import React, { Component } from 'react';
import PropTypes from 'prop-types';

import numeral from 'numeral';

import RaisedButton from 'material-ui/RaisedButton';

import getElapsedTime from '../utils/getElapsedTime';
import secondsTohhmmss from '../utils/secondsTohhmmss';

numeral.defaultFormat('$0,0.00');

const styles = {
  value: {
    fontSize: '48px',
    marginBottom: '4px',
  },
  time: {
    fontSize: '18px',
    color: '#b9b9b9',
    marginBottom: '12px',
  },
  button: {
    margin: 12,
  },
};

class Timer extends Component {
  componentWillMount() {
    if (this.props.play) {
      this.interval = setInterval(this.forceUpdate.bind(this), 333);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggle = (elapsed) => {
    if (this.props.play) {
      this.props.stop(this.props.id);
      clearInterval(this.interval);
    } else {
      this.props.start(this.props.id, elapsed);
      this.interval = setInterval(this.forceUpdate.bind(this), 333);
    }
  };

  render() {
    const { baseTime, startedAt, stoppedAt } = this.props.timer;
    const elapsed = getElapsedTime(baseTime, startedAt, stoppedAt);
    const seconds = elapsed > 1000 ? Math.floor(elapsed / 1000) : 0;
    const value = numeral(seconds * 0.01053 * this.props.attendees).format();
    const hhmmss = secondsTohhmmss(seconds);

    return (
      <div>
        <div style={styles.value}>
          {value}
        </div>
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
          onClick={() => this.props.reset(this.props.id)}
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
  id: PropTypes.string.isRequired,
  timer: PropTypes.shape({
    baseTime: PropTypes.number,
    startedAt: PropTypes.number,
    stoppedAt: PropTypes.number,
  }).isRequired,
  attendees: PropTypes.number,
};

Timer.defaultProps = {
  attendees: 1,
};

export default Timer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';

import SecondsTohmmss from '../utils/SecondsTohhmmss';

const styles = {
  time: {
    fontSize: '48px',
  },
  button: {
    margin: 12,
  },
};

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }

  getInitialState = () => (
    {
      clock: 0,
      time: '00:00:00',
      play: false,
    });

  componentDidMount() {
    if (this.state.play) {
      this.interval = setInterval(this.tick, 1000);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.play !== this.state.play) {
      if (nextState.play) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  start = () => {
    this.props.toggle();
    this.interval = setInterval(this.tick, 1000);
  }

  stop = () => {
    this.props.toggle();
    clearInterval(this.interval);
  }

  reset = () => {
    this.props.reset();
    this.stop();
    this.setState(this.getInitialState());
  }

  tick = () => {
    this.setState({
      clock: this.state.clock + 1,
      time: SecondsTohmmss(this.state.clock + 1),
    });
  }

  render() {
    return (
      <div>
        <div style={styles.time}>
          {this.state.time}
        </div>
        <RaisedButton
          label={this.state.play ? 'Stop' : 'Start'}
          primary={!this.state.play}
          secondary={this.state.play}
          style={styles.button}
          onClick={() => this.setState({ play: !this.state.play })}
        />
        <RaisedButton
          label="Reset"
          style={styles.button}
          onClick={this.reset}
        />
      </div>
    );
  }
}

Timer.propTypes = {
  toggle: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Timer;

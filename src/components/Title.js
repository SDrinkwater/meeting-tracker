import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';

const styles = {
  container: {
    display: 'inline-block',
    width: '200px',
    overflow: 'hidden',
    height: '48px',
  },
  textField: {
    textAlign: 'center',
  },
  title: {
    lineHeight: '48px',
    width: '200px',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};

class Title extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: false,
      localValue: undefined,
    };
  }

  componentWillMount() {
    this.setState({ localValue: this.props.value });
  }

  onBlur = () => {
    this.setState({ selected: false });
    this.props.setTitle(this.props.id, this.state.localValue);
  }

  onChange = (event) => {
    this.setState({ localValue: event.target.value });
  }

  onKeyUp = (e) => {
    if (e.keyCode === 13 || e.keyCode === 27) {
      this.onBlur();
    }
  };

  getTitleFocus = () => {
    this.setState({ selected: true }, () => {
      this.input.focus();
    });
  }

  getTitle = () => {
    if (this.state.selected) {
      return (
        <TextField
          hintText="Title"
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
          ref={(o) => { this.input = o; }}
          style={styles.textField}
          value={this.state.localValue}
        />
      );
    }
    return (
      <div style={styles.title}>
        {this.props.value}
      </div>
    );
  }

  render() {
    const title = this.getTitle();
    return (
      <div
        style={styles.container}
        ref={(o) => { this.title = o; }}
        onClick={this.getTitleFocus}
        onBlur={this.onBlur}
      >
        { title }
      </div>
    );
  }
}

Title.propTypes = {
  id: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Title;

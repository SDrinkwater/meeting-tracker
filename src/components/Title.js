import React, { Component } from 'react';

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
      value: 'Meeting',
    };
  }

  onBlur = () => {
    this.setState({ selected: false });
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  onKeyPress = (e) => {
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
          onKeyUp={this.onKeyPress}
          ref={(o) => { this.input = o; }}
          style={styles.textField}
          value={this.state.value}
        />
      );
    }
    return (
      <div style={styles.title}>
        {this.state.value}
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

export default Title;

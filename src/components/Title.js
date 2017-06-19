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

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  getTitle = () => {
    if (this.state.selected) {
      return (
        <TextField
          hintText="Title"
          onChange={this.onChange}
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

  getTitleFocus = () => {
    this.setState({ selected: true }, () => {
      this.input.focus();
    });
  }

  render() {
    const title = this.getTitle();
    return (
      <div
        style={styles.container}
        ref={(o) => { this.title = o; }}
        onClick={this.getTitleFocus}
        onBlur={() => this.setState({ selected: false })}
      >
        { title }
      </div>
    );
  }
}

export default Title;

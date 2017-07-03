import React from 'react';
import PropTypes from 'prop-types';

const style = {
  width: '37px',
  margin: '5px',
  border: '0px',
  fontSize: '18px',
};

const NumberInput = props => (
  <div>
    {props.label}
    <input
      type="number"
      min={props.min}
      max={props.max}
      style={style}
      onChange={props.onChange}
      value={props.value}
    />
  </div>
);

NumberInput.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.number,
};

NumberInput.defaultProps = {
  label: '',
  min: null,
  max: undefined,
  onChange: undefined,
  value: undefined,
};

export default NumberInput;

import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'utils/theme'

@styled`
  display: block;
  text-align: left;
  font-size: 0.9em;
  line-height: 2;
  input {
    display: inline-block;
    margin-right: 6px;
  }
`
export default class SelectField extends React.Component {

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.sting,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const { choices, disabled } = this.props
    return (
      <radiogroup {...this.props} className={this.props.className} onChange={undefined}>
        {choices.map(choice => (
          <label key={`${choice.text}_${choice.value}`}>
            <input
              name={this.props.name}
              type="radio"
              value={choice.value}
              checked={this.props.value === choice.value}
              disabled={disabled}
              onChange={this.handleChange}
            />
            <span>{choice.text}</span>
          </label>
        ))}
      </radiogroup>
    )
  }

}

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
export class SelectField extends React.Component {

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.object,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const { choices, value, className, name } = this.props
    return (
      <radiogroup {...this.props} className={className} onChange={undefined}>
        {choices.map((choice, index) => (
          <label key={choice.value}>
            <input
              key={`${choice.text}_${choice.value}`}
              name={name}
              type="radio"
              value={choice.value}
              checked={value === choice.value}
              onChange={this.handleChange}
            />
            <span>{choice.text}</span>
          </label>
        ))}
      </radiogroup>
    )
  }

}
export default SelectField

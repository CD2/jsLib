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
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    choices: PropTypes.arrayOf(PropTypes.string)
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    console.log(e.target.value)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const { choices } = this.props
    return (
      <radiogroup {...this.props} onChange={undefined} className={this.props.className}>
        {choices.map(choice => (
          <label>
            <input
              key={`${choice.text}_${choice.value}`}
              name={this.props.name}
              type="radio"
              value={choice.value}
              onChange={this.handleChange}
              checked={this.props.value === choice.value}
            />
            <span>{choice.text}</span>
          </label>
        ))}
      </radiogroup>
    )
  }
}

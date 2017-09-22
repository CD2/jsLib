import React from 'react'
import PropTypes from 'prop-types'

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
    if (onChange) onChange({name: e.target.name, value: e.target.value})
  }

  render() {
    const { choices } = this.props
    return (
      <radiogroup {...this.props} onChange={undefined}>
        {choices.map(choice => (
          <label>
            {choice.text}
            <input
              key={`${choice.text}_${choice.value}`}
              name={this.props.name}
              type='radio'
              value={choice.value}
              onChange={this.handleChange}
              checked={this.props.value === choice.value}
            />
          </label>
        ))}
      </radiogroup>
    )
  }
}

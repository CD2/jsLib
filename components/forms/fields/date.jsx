import React from 'react'
import PropTypes from 'prop-types'

export default class DateField extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    onKeyPress: PropTypes.func,
    onFocus: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    type: PropTypes.string,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const { name, value, placeholder, initialValue, onFocus, type, onKeyPress } = this.props

    return (
      <input
        type={type || `text`}
        name={name}
        defaultValue={initialValue}
        value={value || ``}
        placeholder={placeholder}
        onChange={this.handleChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      />
    )
  }
}

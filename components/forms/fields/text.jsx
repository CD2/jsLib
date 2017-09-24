import React from 'react'
import PropTypes from 'prop-types'

export default class TextField extends React.Component {

  static propTypes = {
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onRawChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const { name, value, autoFocus, placeholder, initialValue, onFocus, type, onKeyPress } = this.props;

    return (
      <input
        type={type || 'text'}
        autoFocus={autoFocus}
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

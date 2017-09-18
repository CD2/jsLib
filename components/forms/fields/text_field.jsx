import React from 'react'
import PropTypes from 'prop-types'

export default class TextField extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    onFocus: PropTypes.func,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    initialValue: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({name: e.target.name, value: e.target.value})
  }

  render() {
    const { name, value, placeholder, initialValue, defaultValue, onFocus, type } = this.props;

    return (
      <input
        type={type}
        name={name}
        defaultValue={value || initialValue || defaultValue}
        placeholder={placeholder}
        onChange={this.handleChange}
        onFocus={onFocus}
      />
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'

export default class Checkbox extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({name: e.target.name, value: e.target.checked})
  }

  render() {
    return (
      <input {...this.props} onChange={this.handleChange}/>
    )
  }
}

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
    if (onChange) onChange({name: e.target.name, value: e.target.value})
  }

  render() {
    const { choices } = this.props
    return (
      <select {...this.props} onChange={this.handleChange}>
        {choices.map(choice => <option>{choice}</option>)}
      </select>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

@styled`
  display: block;
  text-align: left;
  font-size: 0.9em;
  .input {
    display: inline-block;
    margin-right: 6px;
  }
`
export default class Checkbox extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({name: e.target.name, value: e.target.value})
  }

  render() {
    return (
      <label className={this.props.className}>
        <input {...this.props} className='input' onChange={this.handleChange}/>
        <span>{this.props.labelText}</span>
      </label>
    )
  }
}


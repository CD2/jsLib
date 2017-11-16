import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'utils/theme'

@styled`
  display: block;
  text-align: left;
  font-size: 0.9em;
  .input {
    display: inline-block;
    margin-right: 6px;
  }
`
export class Checkbox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    labelText: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.checked })
  }

  render() {
    const { className, labelText } = this.props
    const props = { ...this.props }
    delete props.labelText
    delete props.model
    delete props.theme
    return (
      <label className={className}>
        <input {...props} className="input" onChange={this.handleChange} />
        <span>{labelText}</span>
      </label>
    )
  }

}
export default Checkbox

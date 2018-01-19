import React from "react"
import PropTypes from "prop-types"

export class TextField extends React.Component {
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

  handleChange = e => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const props = { ...this.props }
    delete props.initialValue
    delete props.onRawChange
    delete props.theme
    props.type = props.type || `text`
    props.value = props.value || ``

    return <input {...props} onChange={this.handleChange} />
  }
}
export default TextField

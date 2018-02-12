import React from "react"
import PropTypes from "prop-types"
import { styled } from "lib/utils/theme"
import { observer } from "mobx-react"
import { observable, action } from "mobx"

@styled`
  display: block;
  text-align: left;
  font-size: 0.9em;
  .input {
    display: inline-block;
    margin-right: 6px;
  }
`
@observer
export class Checkbox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    labelText: PropTypes.node,
    model: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.bool,
  }

  static defaultProps = {
    value: false,
  }

  @action
  componentDidUpdate(props) {
    if (props.value !== this.props.value) this.checked = this.props.value
  }

  @observable
  checked = !!(this.props.model
    ? this.props.model.get(this.props.name)
    : this.props.value)

  @action
  handleChange = e => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) {
      onChange({ name: e.target.name, value: e.target.checked })
      this.checked = e.target.checked
    }
  }

  render() {
    const { className, labelText } = this.props
    const props = { ...this.props }
    delete props.labelText
    delete props.model
    delete props.theme
    delete props.value
    return (
      <label className={className}>
        <input
          {...props}
          className="input"
          checked={this.checked}
          onChange={this.handleChange}
        />
        <span>{labelText}</span>
      </label>
    )
  }
}
export default Checkbox

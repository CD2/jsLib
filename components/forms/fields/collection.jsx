import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { observable, action } from "mobx"

@observer
export default class CollectionSelect extends React.Component {
  static propTypes = {
    cord: PropTypes.object,
    defaultValue: PropTypes.any,
    error: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    options: PropTypes.array,
    scope: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.any.isRequired,
  }

  static defaultProps = {
    scope: `all`,
    multiple: false,
    defaultValue: null,
  }

  @observable value = this.props.defaultValue || (this.props.multiple ? [] : ``)

  @action
  handleChange = newValue => {
    let value = newValue

    if (this.props.multiple) {
      const index = this.value.findIndex(element => element === value)

      if (index === -1) {
        value = [...this.value, value]
      } else {
        value = this.value.filter(element => element !== value)
      }
    }

    this.value = value
    this.props.onChange({ name: this.props.name, value })
  }

  renderOption = record => {
    const { value } = this.props
    const v = typeof value === `function` ? value(record) : record[this.props.value]
    return (
      <option
        value={record.id}
        onClick={() => (this.props.multiple ? this.handleChange(record.id) : null)}
      >
        {v}
      </option>
    )
  }

  renderOptions() {
    return this.props.options.map(option => (
      <option
        value={option.value}
        key={option.value}
        onClick={() => (this.props.multiple ? this.handleChange(option.value) : null)}
      >
        {option.text}
      </option>
    ))
  }

  render() {
    const { props } = this
    if (!this.props.multiple) {
      props.options.splice(0, 0, <option key={`collectionnSelectEmpty`}>-----</option>)
    }

    return (
      <select
        multiple={this.props.multiple}
        value={this.value}
        onChange={e => (!this.props.multiple ? this.handleChange(e.target.value) : null)}
      >
        {this.renderOptions()}
      </select>
    )
  }
}

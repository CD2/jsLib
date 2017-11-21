import React from 'react'
import PropTypes from 'prop-types'

import idsLoader from 'components/generic/ids_loader'
import loader from 'components/generic/loader'

//import MultiSelect from 'javascript_lib/components/collection_select/multi_select';

export default class CollectionSelect extends React.Component {

  static propTypes = {
    cord: PropTypes.object,
    defaultValue: PropTypes.any,
    error: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    scope: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.any.isRequired,
    options: PropTypes.array,
  }

  static defaultProps = {
    scope: `all`,
    multiple: false,
    defaultValue: null,
  }

  state = {
    value: this.props.defaultValue || (this.props.multiple ? [] : ``),
  }

  handleChange = (newValue) => {
    let value = newValue

    if(this.props.multiple) {
      const index = this.state.value.findIndex(element => element === value)

      if(index === -1) {
        value = [...this.state.value, value]
      } else {
        value = this.state.value.filter(element => element !== value)
      }
    }
    this.setState({ value })
    this.props.onChange({ name: this.props.name, value })
  }

  renderOption = (record) => {
    const { value } = this.props
    const v = typeof value === `function`
      ? value(record)
      : record[this.props.value]
    return (
      <option
        value={record.id}
        onClick={() => this.props.multiple ? this.handleChange(record.id) : null}
      >{v}
      </option>
    )
  }

  renderOptions(){
    return this.props.options.map(option=>(
      <option
        value={option.value}
        key={option.value}
        onClick={() => this.props.multiple ? this.handleChange(option.value) : null}
      >{option.text}
      </option>
    ))
  }

  render(){
    const { props } = this
    if(!this.props.multiple)
    {props.options.splice(0,0,
      <option
        key={`collectionnSelectEmpty`}
      >-----</option>)
    }

    return (
      <select
        multiple={this.props.multiple}
        value={this.state.value}
        onChange={e => !this.props.multiple ? this.handleChange(e.target.value) : null}
      >
        {this.renderOptions()}
      </select>
    )
  }

}

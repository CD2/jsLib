import React from 'react'
import PropTypes from 'prop-types'

export default class ColumnFilterSearch extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }))
  }

  state = {
    values: [],
  }

  handleChange = (e) => {
    const { name, checked } = e.target
    this.setState(prevState => {
      let values = (checked)
        ? [...prevState.values, name]
        : prevState.values.filter(v=> v !== name)
      return { values }
    })
  }

  handleSubmit = () => {
    this.props.onChange(this.state.value)
  }

  isChecked(value) {
    return this.state.values.includes(value)
  }

  renderOption(option) {
    return (
      <label>
        <input
          type='checkbox'
          name={option.value}
          checked={this.isChecked(option.value)}
          onChange={this.handleChange}/>
        {option.label}
      </label>
    )
  }

  render() {
    const { name, options } = this.props
    return (
      <div>
        <h4>{name}</h4>
        {options.map(option => this.renderOption(option))}
        <button onClick={this.handleSubmit}>Apply</button>
      </div>
    )
  }

}

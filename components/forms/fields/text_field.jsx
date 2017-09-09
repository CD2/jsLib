import React from 'react'
import PropTypes from 'prop-types'

export default class TextField extends React.Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    description: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool,
    ]),
    initialValue: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    style: PropTypes.object,
    onKeyDown: PropTypes.func,
    value: PropTypes.string,
  }

  static contextTypes = {
    form: PropTypes.object,
    style: null,
  }

  constructor(props) {
    super()

    this.id = `${Math.random()}_field`
    this.state = {
      value: props.initialValue || '',
      errors: []
    }
  }

  componentDidMount() {
    this.unregister = this.context.form.register(this)
  }

  componentWillUnmount() {
    this.unregister && this.unregister()
  }

  getName() {
    return this.props.name
  }

  getValue() {
    return this.state.value
  }

  handleChange = e => {
    this.setState({value: e.target.value});
    this.props.onChange && this.props.onChange(e.target.value);
  }

  render() {
    const { type, placeholder, disabled } = this.props
    return (
      <input
        style={this.props.style}
        type={type}
        placeholder={placeholder}
        value={this.props.value !== null ? this.props.value : this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.props.onKeyDown}
        disabled={disabled}/>
    )
  }
}

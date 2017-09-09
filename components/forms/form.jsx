import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

@styled`
  .field {
    margin-bottom: 10px;
  }
  label > input {
    margin-top: 4px;
  }
`

export default class Form extends React.Component {

  fields = {}

  static propTypes = {
    children: PropTypes.node,
    action: PropTypes.func.isRequired,
    onSuccess: PropTypes.func,
    as: PropTypes.string,
  }

  static childContextTypes = {
    form: PropTypes.object
  }

  state = {
    errors: null,
  }

  getChildContext() {
    return {form: {register: this.registerField}}
  }

  registerField = (field) => {
    let key
    do {
      key = String(Math.random())
    } while (key in this.fields)
    this.fields[key] = field
    return () => this.unregisterField(key)
  }

  unregisterField(key) {
    delete this.fields[key]
  }

  eachField(callback) {
    Object.values(this.fields).forEach(callback)
  }

  reset() {
    this.eachField(field => field.reset())
  }

  valid() {
    let valid = true
    this.eachField(field => {
      if (!field.valid()) {
        valid = false
      }
    })
    return valid
  }

  getValues() {
    const data = {}
    this.eachField(field => {
      const name = field.getName()
      const value = field.getValue()
      data[name] = value
    })
    if (this.props.as) return {[this.props.as]: data}
    return data
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState({errors: null})
    if (true || this.valid()) {
      const values = this.getValues()
      window.Promise.resolve(this.props.action(values)).then(response => {
        if (this.props.onSuccess) this.props.onSuccess(response)
      }).catch(error => {
        console.error(window.e = error)
        this.setState({ errors: error.response.data })
      })
    }
  }

  renderErrors() {
    const { errors } = this.state
    if (errors === null) return
    if (typeof errors === 'string') {
      return (
        <ul>
          <li className="flash error">Sorry, an unexpected error has occured.</li>)
        </ul>
      )
    }
    return (
      <ul>
        {Object.entries(errors).map(([field, message]) => <li className="flash error">{field} {message}</li>)}
      </ul>
    )
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        {this.props.children}
      </form>
    )
  }

}

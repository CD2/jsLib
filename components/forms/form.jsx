import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'lib/utils/theme'

@styled`
  label > input {
    margin-top: 4px;
  }
`
export default class Form extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    onSubmit: PropTypes.func,
    preventDefault: PropTypes.bool,
  }

  static defaultProps = {
    preventDefault: true,
  }

  handleSubmit = (e) => {
    const { onSubmit, preventDefault } = this.props
    if (preventDefault) e.preventDefault()
    if (onSubmit) onSubmit(e)
  }

  renderErrors() {
    const { errors } = this.props
    if (!errors) return
    return (
      <ul>
        {errors.map(msg => <li key={msg}>{msg}</li>)}
      </ul>
    )
  }

  render() {
    const { className, children } = this.props
    return (
      <form className={className} onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        {children}
      </form>
    )
  }

}

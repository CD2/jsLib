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

  static propTypes = {
    children: PropTypes.node,
    onSubmit: PropTypes.func,
    errors: PropTypes.arrayOf(PropTypes.string),
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
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        {this.renderErrors()}
        {this.props.children}
      </form>
    )
  }

}

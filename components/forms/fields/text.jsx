import React from 'react'
import PropTypes from 'prop-types'

import { isFormField } from '../index'

@isFormField
export default class TextField extends React.Component {

  static propTypes = {
    error: PropTypes.array,
    value: PropTypes.string,
    onChange: PropTypes.onChange,
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
  }

  handleChange = (e) => {
    this.props.onChange(e.target.value)
  }

  render() {
    const { type, value } = this.props
    return (
      <input type={type} onChange={this.handleChange} value={value}/>
    )
  }

}

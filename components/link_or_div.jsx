import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


export default class LinkOrDiv extends React.Component {

  static propTypes = {
    noLink: PropTypes.bool
  }

  render() {
    if (this.props.noLink) {
      const props = { ...this.props }
      delete props.href
      delete props.to
      delete props.noLink
      return (<div {...props} />)
    }
    return (<Link {...this.props} />)
  }

}

import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export class LinkOrDiv extends React.Component {

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
    const props = { ...this.props }
    delete props.noLink
    return (<Link {...props} />)
  }

}
export default LinkOrDiv

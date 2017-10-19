import React from 'react'
import PropTypes from 'prop-types'

export default class ListItem extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  render() {
    const { children, className=`` } = this.props
    return (
      <div className={`list_item ${className}`}>
        { children }
      </div>
    )
  }

}

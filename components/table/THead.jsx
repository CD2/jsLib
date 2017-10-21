import React from 'react'
import PropTypes from 'prop-types'

export default class THead extends React.Component {
  
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    const { children } = this.props
    return (
      <thead>
        <tr>
          {children}
        </tr>
      </thead>
    )
  }

}

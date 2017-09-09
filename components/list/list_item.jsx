import React from 'react'

export default class ListItem extends React.Component {
  render() {
    const { children, className='' } = this.props
    return (
      <div className={`list_item ${className}`}>
        { children }
      </div>
    )
  }
}

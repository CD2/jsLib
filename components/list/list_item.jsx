import React from "react"
import PropTypes from "prop-types"

export class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
  }

  render() {
    const { children, onClick, className = `` } = this.props
    return (
      <div className={`list_item ${className}`} onClick={onClick}>
        {children}
      </div>
    )
  }
}
export default ListItem

import React from "react"
import PropTypes from "prop-types"

export class ListItem extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
  }

  render() {
    const { children, onClick, style, className = `` } = this.props
    return (
      <div style={style} className={`list_item ${className}`} onClick={onClick}>
        {children}
      </div>
    )
  }
}
export default ListItem

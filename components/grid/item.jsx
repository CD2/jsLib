import React from "react"
import { styled, p } from "lib/utils/theme"
import PropTypes from "prop-types"

@styled`
  width: ${p(`width`, `100%`)};
  display: inline-block;
  vertical-align: top;
  text-align: ${p(`align`, `left`)};
  > p:first-child {
    margin-top: 0;
  }
`
export class GridItem extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const { className, children, onClick, style } = this.props
    return (
      <div className={className} onClick={onClick} style={style}>
        {children}
      </div>
    )
  }
}
export default GridItem

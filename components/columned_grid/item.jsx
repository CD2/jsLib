import React from 'react'
import PropTypes from 'prop-types'
import { styled, p } from 'utils/theme'

@styled`
  width: ${p(`width`, `100%`)};
  display: inline-block;
  vertical-align: top;
  text-align: ${p(`align`, `left`)};
  > p:first-child {
    margin-top: 0;
  }
`
export default class GridItem extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
  }

  render() {
    const { className, children, onClick } = this.props
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    )
  }

}

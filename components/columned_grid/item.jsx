import React from 'react'
import { styled, p } from 'utils/theme'

@styled`
  width: ${p('width', '100%')};
  display: inline-block;
  vertical-align: top;
  text-align: ${p('align', 'left')};
  > p:first-child {
    margin-top: 0;
  }
`
export default class GridItem extends React.Component {

  render() {
    const { className, children, onClick } = this.props
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    )
  }

}

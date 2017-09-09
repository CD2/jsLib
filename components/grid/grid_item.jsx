import React from 'react'
import PropTypes from 'prop-types'
import { styled, t, media } from 'utils/theme'
@styled`
  display: inline-block;
  width: 100%;
  @media (min-width: ${t('medium')}px) {
    width: ${props =>`calc(${props.weight * 100}% - ${props.gutterWidth}px)`};     
  }
  vertical-align: top;
  ${({align = 'left'}) => `text-align: ${align}`}
  }
  > p:first-child {
    margin-top: 0;
  }
`
export default class GridItem extends React.Component {

  static PropTypes = {
    align: PropTypes.string,
  }

  render() {
    const { children, className } = this.props
    return (
      <div className={className}>
        { children }
      </div>
    )
  }
}

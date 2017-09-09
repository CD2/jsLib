import React from 'react'
import { styled, t } from 'utils/theme'

@styled`
  display: flex;
  flex-wrap: wrap;
  
  .gutter {
    display: inline-block;
    min-width: ${t('gutterWidth')}px;
    vertical-align: top;
  }
  
  .gutter__horizontal {
    min-height: ${t('gutterWidth')}px;
    width: 100%;
  }
  
`
export default class Grid extends React.Component {

  render() {
    const { children, className, theme } = this.props

    const totalChildren = React.Children.count(children)
    const gutterWidth = theme.gutterWidth * ((totalChildren - 1) / totalChildren)

    let totalWeight = 0
    const gridItems = React.Children.map(children, (child, i) => {
      totalWeight += child.props.weight
      child = React.cloneElement(child, {key: `item_${i}`, ...child.props, gutterWidth })

      if (totalWeight > 1) {
        totalWeight = child.props.weight
        return [<div key={`gutter_${i}`} className='gutter__horizontal' />, child]
      }
      return (i===0)
        ? child
        : [<div key={`gutter_${i}`} className='gutter' />, child]
    })
    return (

      <div className={className}>
        { gridItems }
      </div>
    )
  }

}

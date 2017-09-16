import React from 'react'
import { styled, t } from 'utils/theme'

@styled`
  display: flex;
  flex-wrap: wrap;

  .gutter {
    display: inline-block;
    min-width: ${t('gutterWidth')}px;
    vertical-align: top;
    & + .gutter {
      display: none;
    }
  }

  .gutter__horizontal {
    min-height: ${t('gutterWidth')}px;
    width: 100%;
  }

`
export default class Grid extends React.Component {

  render() {
    const { children, className, theme } = this.props

    let toBeFitted = []
    const gridItems = []
    let totalWeight = 0
    let gutterWidth

    const fitChildren = (qqqq) => {

      const totalChildren = toBeFitted.length

      if (!qqqq || !gutterWidth || totalWeight===1) gutterWidth = theme.gutterWidth * ((totalChildren - 1) / totalChildren)
      if (gridItems.length !== 0) gridItems.push(<div key={`gutter_${gridItems.length}`} className='gutter__horizontal' />)
      toBeFitted.forEach((child, i) => {
        child = React.cloneElement(child, {key: `child_${gridItems.length}`, ...child.props, gutterWidth })
        if (i>0) gridItems.push(<div key={`gutter_${gridItems.length}`} className='gutter' />)
        gridItems.push(child)
      })
      toBeFitted = []
    }

    React.Children.map(children, (child) => {
      if (!child) return
      totalWeight += child.props.weight
      if (totalWeight > 1) {
        fitChildren()
        totalWeight = child.props.weight
      }
      toBeFitted.push(child)
    })
    fitChildren(true)

    return (
      <div className={className}>
        {gridItems}
      </div>
    )
  }

}

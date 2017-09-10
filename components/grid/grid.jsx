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

    let tobeFitted = []
    const gridItems = []
    let totalWeight = 0

    const fitChildren = () => {
      const totalChildren = tobeFitted.length
      const gutterWidth = theme.gutterWidth * ((totalChildren - 1) / totalChildren)
      if (gridItems.length !== 0) gridItems.push(<div key={`gutter_${gridItems.length}`} className='gutter__horizontal' />)
      tobeFitted.forEach((child, i) => {
        child = React.cloneElement(child, {...child.props, gutterWidth })
        if (i>0) gridItems.push(<div key={`gutter_${gridItems.length}`} className='gutter' />)
        gridItems.push(child)
      })
      tobeFitted = []
    }

    React.Children.map(children, (child) => {
      totalWeight += child.props.weight
      if (totalWeight > 1) {
        fitChildren()
        totalWeight = child.props.weight
      }
      tobeFitted.push(child)
    })
    fitChildren()

    return (
      <div className={className}>
        {gridItems}
      </div>
    )
  }

}

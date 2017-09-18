import React from 'react'
import PropTypes from 'prop-types'
import Item from './item'
import { styled, t } from 'utils/theme'

@styled`
  display: flex;
  flex-wrap: wrap;

  .gutter {
    display: inline-block;
    min-width: ${props => props.gutterWidth || props.theme.gutterWidth}px;
    vertical-align: top;
    & + .gutter {
      display: none;
    }
  }

  .gutter__horizontal {
    min-height: ${t('gutterHeight')}px;
    width: 100%;
  }
`
class ColumnedGrid extends React.Component {

  static propTypes = {
    columns: PropTypes.number.isRequired
  }

  render() {
    const { columns, children, className } = this.props
    const gutter = <div className='gutter' />
    const gutterHorizontal = <div className='gutter__horizontal' />

    const gutterWidth = this.props.gutterWidth || this.props.theme.gutterWidth

    const getWidth = (span=1) => {
      const colspans = ((span/columns)*100) + '%'
      const gutterOffsets = span * (((columns-1)/columns)*gutterWidth) + 'px'
      const gutterOverlaps = (span-1)*gutterWidth + 'px'
      return `calc( ${colspans} - ${gutterOffsets} + ${gutterOverlaps} )`
    }

    let takenColumns = 0
    const items = React.Children.map(children, (child, i)=>{
      if (!child) return

      const colspan = child.props.colspan ? (child.props.colspan==='fill' ? (columns - takenColumns <= 0 ? columns : columns-takenColumns) : child.props.colspan): 1
      const childWithWidth = React.cloneElement(child, {...child.props, width: getWidth(colspan)})
      let neededGutter = gutter
      takenColumns += colspan
      if (takenColumns > columns) {
        neededGutter = gutterHorizontal
        takenColumns = colspan
      }

      if (i === 0) return childWithWidth
      return [neededGutter, childWithWidth]
    })

    return (
      <div className={className}>
        {items}
      </div>
    )
  }

}

ColumnedGrid.Item = Item

export default ColumnedGrid

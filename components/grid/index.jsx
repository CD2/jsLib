import React from "react"
import PropTypes from "prop-types"
import Item from "./item"
import { styled } from "lib/utils/theme"

@styled`
  display: flex;
  flex-wrap: wrap;

  > .gutter {
    display: inline-block;
    min-width: ${props => props.gutterWidth || props.theme.gutterWidth.value}px;
    vertical-align: top;
    & + .gutter {
      display: none;
    }
  }

  .gutter__horizontal {
    min-height: ${props => props.gutterHeight || props.theme.gutterHeight.value}px;
    width: 100%;
  }
`
class Grid extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    columns: PropTypes.number,
    gutterWidth: PropTypes.number,
    noGutters: PropTypes.bool,
    theme: PropTypes.object,
  }

  static defaultProps = {
    align: `left`,
    noGutters: false,
  }

  render() {
    const { columns, children, className, noGutters } = this.props
    const gutter = <div className="gutter" />
    const gutterHorizontal = <div className="gutter__horizontal" />

    let gutterWidth = this.props.gutterWidth || this.props.theme.gutterWidth.value
    if (noGutters) gutterWidth = 0

    const getWidth = (span = 1) => {
      const colSpans = `${span / columns * 100}%`
      const gutterOffsets = `${span * ((columns - 1) / columns * gutterWidth)}px`
      const gutterOverlaps = `${(span - 1) * gutterWidth}px`
      return `calc( ${colSpans} - ${gutterOffsets} + ${gutterOverlaps} )`
    }

    let takenColumns = 0
    const items = React.Children.map(children, (child, i) => {
      if (!child) return

      const colSpan = child.props.colSpan
        ? child.props.colSpan === `fill`
          ? columns - takenColumns <= 0 ? columns : columns - takenColumns
          : child.props.colSpan
        : 1

      const childWithWidth = React.cloneElement(child, { ...child.props, width: getWidth(colSpan) })
      let neededGutter = gutter
      takenColumns += colSpan
      if (takenColumns > columns) {
        neededGutter = gutterHorizontal
        takenColumns = colSpan
      }

      if (i === 0) return childWithWidth
      if (noGutters) return childWithWidth
      return [neededGutter, childWithWidth]
    })

    return <div className={className}>{items}</div>
  }
}

Grid.Item = Item

export default Grid

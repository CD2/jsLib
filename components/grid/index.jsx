import React from "react"
import PropTypes from "prop-types"
import Item from "./item"
import { styled } from "lib/utils/theme"
import { snakeCase } from "help-my-strings"
import invariant from "invariant"
@styled`
  display: flex;
  flex-wrap: wrap;

  > .gutter {
    display: inline-block;
    min-width: ${props => props.gutterWidth || props.theme.gutterWidth}px;
    vertical-align: top;
    & + .gutter {
      display: none;
    }
  }

  .gutter__horizontal {
    min-height: ${props => props.gutterHeight || props.theme.gutterHeight}px;
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
    style: PropTypes.object,
    theme: PropTypes.object,
  }

  static defaultProps = {
    align: `left`,
    noGutters: false,
  }

  render() {
    const { columns, children, className, noGutters, style } = this.props
    const gutter = <div className="gutter" />
    const gutterHorizontal = <div className="gutter__horizontal" />

    let gutterWidth = this.props.gutterWidth || this.props.theme.gutterWidth
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
          ? columns - takenColumns <= 0
            ? columns
            : columns - takenColumns
          : child.props.colSpan
        : 1

      const childWithWidth = React.cloneElement(child, {
        ...child.props,
        width: getWidth(colSpan),
      })
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

    return (
      <div className={className} style={style}>
        {items}
      </div>
    )
  }
}

function SimpleGrid({ columns, children, align }) {
  return (
    <Grid columns={columns}>
      {children.map((child,index) => <Grid.Item key={index} align={align}>{child}</Grid.Item>)}
    </Grid>
  )
}

function RatioGrid({ columns, children, splitAt, right }) {
  invariant(children.length === 2, `Grid must contain 2 children`)
  if (right) {
    return (
      <Grid columns={splitAt ? 1 : columns}>
        <Grid.Item>{children[0]}</Grid.Item>
        <Grid.Item colSpan={splitAt ? 1 : columns - 1}>{children[1]}</Grid.Item>
      </Grid>
    )
  }
  return (
    <Grid columns={splitAt ? 1 : columns}>
      <Grid.Item colSpan={splitAt ? 1 : columns - 1}>{children[0]}</Grid.Item>
      <Grid.Item>{children[1]}</Grid.Item>
    </Grid>
  )
}

Grid.Item = Item
Grid.Ratio = RatioGrid
Grid.Simple = SimpleGrid

export default Grid

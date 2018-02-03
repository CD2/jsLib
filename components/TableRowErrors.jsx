import React from "react"
import PropTypes from "prop-types"
import placeholder from "images/placeholder.png"
import Image from "lib/components/image"
import FaIcon from "lib/components/fa_icon"
import theme from "styles/theme"
import decorate from "lib/utils/decorate"
import { observer } from "mobx-react"

export class TableRowErrors extends React.Component {
  static propTypes = {
    alternateAction: PropTypes.func,
    children: PropTypes.any,
    columns: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired,
    resource: PropTypes.object.isRequired,
    thumbnailColumn: PropTypes.bool,
  }

  static defaultProps = {
    thumbnailColumn: false,
    columns: 1,
  }

  renderErrorRow(columns, thumbnailColumn) {
    return (
      <tr>
        {thumbnailColumn && (
          <td className="thumb-column">
            <FaIcon icon="error-outline" color={theme.error} size={1.25} />
          </td>
        )}
        <td colSpan={columns}>
          <span>Error loading {this.props.resource.class.name}</span>
        </td>
        <td />
      </tr>
    )
  }

  renderLoadingRow(columns, thumbnailColumn) {
    let rows = []
    for (let i = 0; i < columns; i++) {
      rows.push(
        <td key={i}>
          <span className={i === 0 ? `placeholder large` : `placeholder small`} />
        </td>,
      )
    }
    return (
      <tr>
        {thumbnailColumn && (
          <td className="thumb-column">
            <Image defaultSrc={placeholder} />
          </td>
        )}
        {rows}
      </tr>
    )
  }

  render() {
    const { resource, render, alternateAction, columns, thumbnailColumn } = this.props
    if (alternateAction) return alternateAction()
    if (resource && resource.errored) return this.renderErrorRow(columns, thumbnailColumn)
    if (resource && resource.loading) return this.renderLoadingRow(columns, thumbnailColumn)
    if (!resource) return this.renderLoadingRow(columns, thumbnailColumn)
    if (resource && !resource.loaded) return this.renderLoadingRow(columns, thumbnailColumn)
    return render()
  }
}

export default decorate(observer, TableRowErrors)

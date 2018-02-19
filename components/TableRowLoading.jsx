import React from "react"
import PropTypes from "prop-types"
import placeholder from "images/placeholder.png"
import Image from "lib/components/image"
import decorate from "lib/utils/decorate"
import { observer } from "mobx-react"

export class TableRowErrors extends React.Component {
  static propTypes = {
    columns: PropTypes.number.isRequired,
    thumbnailColumn: PropTypes.bool,
  }

  static defaultProps = {
    thumbnailColumn: false,
    columns: 1,
  }

  render() {
    const { columns, thumbnailColumn } = this.props
    let rows = []
    for (let i = 0; i < columns; i++) {
      rows.push(
        <td key={i}>
          <span
            className={i === 0 ? `placeholder large` : `placeholder small`}
          />
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
}

export default decorate(observer, TableRowErrors)

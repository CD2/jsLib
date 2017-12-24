import React from 'react'
import PropTypes from 'prop-types'
import { redirect } from 'lib/utils/router'
import Input from 'lib/components/forms/input'
import Image from 'lib/components/image'

export default class PupilTableRow extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    onRedirect: PropTypes.func,
    onRowClick: PropTypes.func,
    onSelect: PropTypes.func,
    pupil: PropTypes.string,
    resource: PropTypes.object,
    rowProps: PropTypes.object,
    selectedIds: PropTypes.array,
  }

  static defaultTypes = {
    onSelect: () => null,
    selectedIds: [],
  }

  handleRowClick = () => {
    if (this.props.onRedirect){
      redirect(this.props.onRedirect(this.props.resource))
    }
  }

  fieldMap = (column) => {
    let r = this.props.resource
    column.fields.map(field=>{
      r = r[field]
    })
    return r ? r : column.conditional
  }

  renderContents = (column, key) => {
    return column.contents(this.props.resource, key)
  }

  fieldType = (column, i) => {
    const { resource } = this.props
    if (column.fields && column.fields.includes(`image`)){
      return (
        <td className="thumb-column">
          <Image
            width={50}
            height={50}
            uid={resource.image_uid}
            crop
            background
          />
        </td>
      )
    }
    if (column.fields && column.fields.includes(`select`)){
      const { id } = resource
      return (
        <td key={i} onClick={e => e.stopPropagation()}>
          <Input
            name={id}
            type="checkbox"
            value={this.props.selectedIds.includes(id)}
            onChange={() => this.props.onSelect(id)}
          />
        </td>
      )
    }
    if (column.fields){
      return (
        <td key={i}>
          {this.fieldMap(column)}
        </td>
      )
    }
    if (column.contents){
      return this.renderContents(column, i)
    }
  }

  render() {
    return (
      <tr onClick={this.handleRowClick}>
        { this.props.columns.map((column, i) => this.fieldType(column, i)) }
      </tr>
    )
  }

}

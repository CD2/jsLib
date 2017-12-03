import React from 'react'
import PropTypes from 'prop-types'
import PaginationControls from './pagination_controls'

import { observable, computed, action } from 'mobx'
import { observer, Provider } from 'mobx-react'
import { styled, t } from 'lib/utils/theme'

@styled`
  font-size: 0.9em;
  thead tr {
    background: ${t(`darkBackground`)};
    color: white;
    &:hover {
      background: ${t(`darkBackground`)};
    }
  }
  tbody tr {
    ${({ noLinks }) => {
      if (!noLinks) {
        return`
          cursor: pointer;
          &:hover {
            background: #f3f7fb;
          }
        `
      }
    }}
  }
  tr {
    background: white;
    &:hover {
      background: white;
    }
  }
  th{
    padding: ${t(`gutterWidth`, w=>w/2)}px;
    white-space: nowrap;
  }
  .background-image {
    border-radius: 5px;
  }
  td {
    padding: ${t(`gutterWidth`, w=>w/4)}px ${t(`gutterWidth`, w=>w/2)}px;
    &.primary { font-weight: 600 }
  }
  th:last-child, td:last-child {
    text-align: right;
  }
  tr:first-child, tr:last-child {
    td {
      padding: ${t(`gutterWidth`, w=>w/2)}px;
    }
  }
  .nowrap {
    white-space: nowrap;
  }
  .table__container {
    border-radius: 6px;
    overflow: hidden;
    box-shadow: ${t(`shadow0`)};
  }
  .thumb-column { width: 70px; }
`
@observer
export class IndexTable extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    headings: PropTypes.node,
    ids: PropTypes.array,
    query: PropTypes.object,
    row: PropTypes.func,
    rowProps: PropTypes.object,
  }

  static defaultProps = {
    rowProps: {},
    ids: null,
  }

  @observable page=1
  @observable per_page=30

  @computed get total_items() {
    return this.props.ids ? this.props.ids.length : this.props.query.ids.length
  }

  @computed get paginated_ids() {
    const start = (this.page-1) * this.per_page
    const end = start + this.per_page
    const ids = this.props.ids || this.props.query.ids
    return ids.slice(start, end)
  }

  @action handlePageChange = (page) => {
    this.page = page
  }

  @computed get pagination_controls() {
    return (
      <PaginationControls
        page={this.page}
        per_page={this.per_page}
        total_items={this.total_items}
        onPageChange={this.handlePageChange}
      />
    )
  }

  render() {
    const { row: Row, headings } = this.props
    return (
      <div className={this.props.className}>
        {this.pagination_controls}
        <Provider query={this.props.query}>
          <div className="table__container">
            <table>
              {headings}
              <tbody>
                {this.paginated_ids.map(id => {
                  return <Row key={id} id={id} {...this.props.rowProps} />
                })}
              </tbody>
            </table>
          </div>
        </Provider>

        {this.pagination_controls}
      </div>
    )
  }

}
export default IndexTable

import React from 'react'
import PropTypes from 'prop-types'
import PaginationControls from './pagination_controls'

import { observable, computed, action } from 'mobx'
import { observer, Provider } from 'mobx-react'
import { styled, t } from 'utils/theme'

@styled`
  font-size: 0.9em;
  text-align: left;
  table {
    border-spacing: 0;
    width: 100%;
  }
  thead tr {
    background: ${t(`darkBackground`)};
    color: white;
    &:hover {
      background: ${t(`darkBackground`)};
    }
  }
  tbody tr {
    cursor: pointer;
  }
  tr {
    background: white;
    &:hover {
      background: ${t(`border`)};
    }
  }
  th{
    padding: ${t(`gutterWidth`, w=>w/4)}px;
    white-space: nowrap;
  }
  td {
    padding: ${t(`gutterWidth`, w=>w/4)}px;
  }
  .nowrap {
    white-space: nowrap;
  }
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
        <div className="table__container">
          <Provider query={this.props.query}>
            <table>
              {headings}
              <tbody>
                {this.paginated_ids.map(id => {
                  return <Row key={id} id={id} {...this.props.rowProps} />
                })}
              </tbody>
            </table>
          </Provider>
        </div>
        {this.pagination_controls}
      </div>
    )
  }

}
export default IndexTable

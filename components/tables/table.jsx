import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from "lib/components/wrapper"
import Pagination from './pagination'
import { styled, t } from 'utils/theme'
import { redirect } from 'utils/router'


@styled`
  .table-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    background-repeat: no-repeat;
    background-color: #ffffff;
    background-size: 301px 100%,12px 100%,301px 100%,12px 100%;
    background-attachment: local,local,scroll,scroll;
    border-bottom: 1px solid ${t(`border`)};
    border-right: 3px solid ${t(`border`)};
  }
  table {
    margin-left: ${t(`stickyTableWidth`)}px;
    border-spacing: 0;
    min-width: calc(100% - ${t(`stickyTableWidth`)}px);
    font-size: 14px;
  }
  thead {
    th, th.sticky {
      background: ${t(`primary`)};
      color: ${t(`background`)};
      font-weight: 400;
      img {
        display: inline-block;
        width: 20px;
      }
    }
  }
  tr:hover {
    background: #fff9cf;
    td.sticky {
      background: #fff9cf;
    }
    cursor: pointer;
  }
`
export default class Table extends React.Component {

  static propTypes = {
    pagination: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.shape({
        page: PropTypes.number,
        per_page: PropTypes.number,
        onPageChange: PropTypes.func,
        component: PropTypes.node,
      })
    ]),
    renderRow: PropTypes.func,
    row_key: PropTypes.string,
    row_url: PropTypes.string,
    rows: PropTypes.array,
  }

  state = {
    pagination: {
      page: 1,
      per_page: 20,
    }
  }

  getRowKey(row) {
    if (this.props.row_key) {
      return row[this.props.row_key]
    }
  }

  getRowUrl(row) {
    if (this.props.row_url) {
      return this.props.row_url(row)
    }
  }

  rowCount() {
    return this.props.rows.length
  }

  isPaginated() {
    return this.props.pagination !== undefined
  }

  getPaginationOptions() {
    const { pagination } = this.props
    if (typeof pagination === `boolean`) return this.state.pagination
    return { ...this.state.pagination, ...pagination }
  }

  getPaginatedRows() {
    const { per_page, page } = this.getPaginationOptions()
    const low = (page-1)*per_page
    const high = low + per_page
    return this.props.rows.slice(low, high)
  }

  handlePageChange = (page) => {
    this.setState({ pagination: { ...this.state.pagination, page }})
    const { onPageChange=()=>{} } = this.getPaginationOptions()
    onPageChange(page)
  }

  renderHeadings() {
    const headings = React.Children.map(this.props.children, child=>{
      return React.cloneElement(child, { ...child.props, renderHeading: true })
    })
    return (<tr>{headings}</tr>)
  }

  defaultRowRenderer(row, { key, url }={}) {
    const data = React.Children.map(this.props.children, child=>{
      return React.cloneElement(child, { ...child.props, row })
    })
    if (url) {
      return (<tr key={key} onClick={redirect(url)}>{data}</tr>)
    }
    return (<tr key={key} onClick={redirect(url)}>{data}</tr>)
  }

  renderRows() {
    const rows = this.getPaginatedRows()
    const columns = this.props.children
    const renderer = this.props.renderRow || this.defaultRowRenderer
    return rows.map(row => renderer(row, columns, { key: this.getRowKey(row), url: this.getRowUrl(row) }))
  }

  renderPagination() {
    if (!this.isPaginated()) return null
    const { per_page, page } = this.getPaginationOptions()

    return (
      <Pagination
        per_page={per_page}
        page={page}
        onPageChange={this.handlePageChange}
        total_items={this.rowCount()}
      />
    )
  }

  render() {
    return (

      <Wrapper className={this.props.className} wide>
        {this.renderPagination()}
        <div className="table-wrapper">
          <table>
            <thead>
              {this.renderHeadings()}
            </thead>
            <tbody>
              {this.renderRows()}
            </tbody>
          </table>
        </div>
        {this.renderPagination()}
      </Wrapper>
    )
  }

}

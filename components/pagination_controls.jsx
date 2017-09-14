import React from 'react'
import PropTypes from 'prop-types'

import Button from "lib/components/button";
import { styled, t } from 'utils/theme'

@styled`
  text-align: center;
  padding: ${t('gutterWidth')}px 0;

  .pagination__control {
    display: inline-block;
    color: ${t('primary')};
    font-weight: bold;
    transition: color ${t('globalTransitionSpeed')};
    margin: 0 9px;
    &:hover {
      color: ${t('primaryLight')};
    }
  }
  .pagination__button {
    display: inline-block;
    margin: 0 6px;
  }
  .current_page {
    font-weight: bold;
  }
`
export default class PaginationControls extends React.Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total_records: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  }

  changePage(page_number) {
    this.props.onPageChange(page_number)
  }

  totalPages() {
    const { total_records, per_page } = this.props
    return Math.ceil(total_records/per_page)
  }

  firstPage() {
    return this.props.page === 1
  }

  lastPage() {
    return this.props.page === this.totalPages()
  }

  renderLeft() {
    const  className = 'pagination__control'
    const str = '‹ Left'
    if (this.firstPage()) {
      return (
        <div className={`${className} disabled`}  buttonStyle="small" >{str}</div>
      )
    }
    return (
      <div className={className} onClick={() => this.changePage(this.props.page - 1)}   buttonStyle="small">{str}</div>
    )
  }

  renderRight() {
    const  className = 'pagination__control'
    const str = 'Right ›'
    if (this.lastPage()) {
      return (
        <div className={`${className} disabled`}  buttonStyle="small" >{str}</div>
      )
    }
    return (
      <div className={className} onClick={() => this.changePage(this.props.page + 1)}  buttonStyle="small" >{str}</div>
    )
  }

  renderPageNumbers() {
    const page_numbers = []
    for(let i=1; i<=this.totalPages(); i++) {
      if (i === this.props.page) {
        page_numbers.push(<div className={'pagination__button current_page'} buttonStyle="small invert" >{i}</div>)
      } else {
        page_numbers.push(<div className={'pagination__button'} key={i} buttonStyle="small" onClick={() => this.changePage(i)} >{i}</div>)
      }
    }
    return page_numbers
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderLeft()}
        {this.renderPageNumbers()}
        {this.renderRight()}
      </div>
    )
  }

}

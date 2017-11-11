import React from 'react'
import PropTypes from 'prop-types'
import decorate from 'utils/decorate'
import { styled, t } from 'utils/theme'


export class PaginationControls extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total_records: PropTypes.number.isRequired,
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
    const  className = `pagination__button`
    if (this.firstPage()) {
      return (
        <div className={`${className} disabled`}>Left</div>
      )
    }
    return (
      <div className={className} onClick={() => this.changePage(this.props.page - 1)}>Left</div>
    )
  }

  renderRight() {
    const  className = `pagination__button`
    if (this.lastPage()) {
      return (
        <div className={`${className} disabled`}>Right</div>
      )
    }
    return (
      <div className={className} onClick={() => this.changePage(this.props.page + 1)}>Right</div>
    )
  }

  renderPageNumbers() {
    const page_numbers = []
    for (let i=1; i<=this.totalPages(); i++) {
      if (i === this.props.page) {
        page_numbers.push(
          <div className="pagination__button current_page" key={i}>
            <span>{i}</span>
          </div>
        )
      } else {
        page_numbers.push(
          <div className="pagination__button" key={i} onClick={() => this.changePage(i)}>
            <span>{i}</span>
          </div>
        )
      }
    }
    return page_numbers
  }

  render() {
    const { className } = this.props
    return (
      <div className={`${className} pagination`} >
        {this.renderLeft()}
        {this.renderPageNumbers()}
        {this.renderRight()}
      </div>
    )
  }

}
export default decorate(
  styled`
  padding: 10px 10px 0;
  text-align: center;

  .pagination__button {
    border-radius: 5px 5px 0 0;
    font-size: .9rem;
    font-weight: 600;
    display: inline-block;
    opacity: .6;
    padding: 16px;
    cursor: pointer;
  }

  .current_page {
    opacity: 1;
    span {
      border-bottom: 2px solid  ${t(`text`)};
    }
  }
`,
  PaginationControls)

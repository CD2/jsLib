import React from 'react'
import PropTypes from 'prop-types'

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
    const  className = 'pagination__button btn btn--secondary btn--small-sq'
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
    const  className = 'pagination__button btn btn--secondary btn--small-sq'
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
    for(let i=1; i<=this.totalPages(); i++) {
      if (i === this.props.page) {
        page_numbers.push(<div key={i} className={'pagination__button btn btn--small-sq current_page'}>{i}</div>)
      } else {
        page_numbers.push(<div className="pagination__button btn btn--secondary btn--small-sq" key={i} onClick={() => this.changePage(i)}>{i}</div>)
      }
    }
    return page_numbers
  }

  render() {
    return (
      <div className='pagination'>
        {this.renderLeft()}
        {this.renderPageNumbers()}
        {this.renderRight()}
      </div>
    )
  }

}

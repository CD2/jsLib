import React from 'react'
import PropTypes from 'prop-types'

export default class Pagination extends React.Component {

  static propTypes = {
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    page_button_limit: PropTypes.number,
    total_items: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    page_button_limit: 6,
  }

  changePage(page_number) {
    if (0 < page_number && page_number <= this.totalPages())
    {this.props.onPageChange(page_number)}
  }

  totalPages() {
    const { total_items, per_page } = this.props
    return Math.ceil(total_items/per_page)
  }

  firstPage() {
    return this.props.page === 1
  }

  lastPage() {
    return this.props.page === this.totalPages()
  }

  renderLeft() {
    let className = `pagination__button`
    if (this.firstPage()) className = ` pagination__button--disabled`
    return (
      <div className={className} onClick={() => this.changePage(this.props.page - 1)}>Left</div>
    )
  }

  renderRight() {
    let className = `pagination__button`
    if (this.lastPage()) className = ` pagination__button--disabled`
    return (
      <div className={className} onClick={() => this.changePage(this.props.page + 1)}>Right</div>
    )
  }

  renderPageNumbers() {
    const page_numbers = []
    const current = this.props.page
    const visibility = 2
    const count = this.totalPages()

    const elipsis = (<div>...</div>)
    const number = (n) => (<div key={n} onClick={() => this.changePage(n)}>{n}</div>)

    page_numbers.push(number(1))
    const min = Math.max(current - visibility, 2)
    if (min > 2) page_numbers.push(elipsis)
    const max = Math.min(Math.max(3+visibility*2, min + visibility*2), count-1)
    for (let i=Math.min(min, count-2-2*visibility); i<=max; i++) page_numbers.push(number(i))
    if (max < count - 1) page_numbers.push(elipsis)
    page_numbers.push(number(count))

    return page_numbers
  }

  render() {
    return (
      <div className="pagination">
        {this.props.page}
        {this.renderLeft()}
        {this.renderPageNumbers()}
        {this.renderRight()}
      </div>
    )
  }

}


// 1  2  3  4  5  6  7  - 70  on < 5
// 1  -  3  4  5  6  7  - 70  on 5
// 1  - 64 65 66 67 68  - 70  on 66
// 1  - 64 65 66 67 68 69 70  on > 66

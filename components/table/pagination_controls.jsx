import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { computed } from "mobx"

import { styled } from "lib/utils/theme"
import Button from "lib/components/button"

@styled`

  .pagination__button {
    opacity: .6;
    display: inline-block;
    vertical-align: middle;
  }

  .current_page {
    opacity: 1;
  }
`
@withRouter
@observer
export class PaginationControls extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    page_button_limit: PropTypes.number,
    per_page: PropTypes.number.isRequired,
    storePageName: PropTypes.string,
    style: PropTypes.object,
    total_items: PropTypes.number.isRequired,
  }

  static defaultProps = {
    page_button_limit: 6,
    storePageName: null,
  }

  changePage(page_number) {
    if (page_number > 0 && page_number <= this.totalPages()) {
      const { storePageName, location } = this.props
      if (storePageName) {
        this.props.history.replace({
          state: {
            ...location.state,
            [`${storePageName}PageNumber`]: page_number,
          },
        })
      }
      this.props.onPageChange(page_number)
    }
  }

  @computed
  get page() {
    const { storePageName, page } = this.props
    const locationPage =
      this.props.location.state &&
      this.props.location.state[`${storePageName}PageNumber`]

    return locationPage || page
  }

  totalPages() {
    const { total_items, per_page } = this.props
    return Math.ceil(total_items / per_page)
  }

  firstPage() {
    return this.page === 1
  }

  lastPage() {
    return this.page === this.totalPages()
  }

  renderLeft() {
    let className = `pagination__button`
    if (this.firstPage()) className += ` pagination__button--disabled`

    return (
      <Button
        buttonStyle="pagination"
        className={className}
        onClick={() => this.changePage(this.page - 1)}
      >
        Left
      </Button>
    )
  }

  renderRight() {
    let className = `pagination__button`
    if (this.lastPage()) className += ` pagination__button--disabled`
    return (
      <Button
        buttonStyle="pagination"
        className={className}
        onClick={() => this.changePage(this.page + 1)}
      >
        Right
      </Button>
    )
  }

  renderPageNumbers() {
    const page_numbers = []
    const current = this.page
    const visibility = 2
    const count = this.totalPages()

    const elipsis = <div className="pagination__button">...</div>
    const number = n => (
      <Button
        key={n}
        buttonStyle="pagination"
        className={`pagination__button ${current === n ? `current_page` : ``}`}
        onClick={() => this.changePage(n)}
      >
        {n}
      </Button>
    )

    if (count < 5 + visibility * 2) {
      for (let i = 1; i <= count; i++) {
        page_numbers.push(number(i))
      }
      return page_numbers
    }

    page_numbers.push(number(1))
    const min = Math.max(current - visibility, 2)
    if (min > 2) page_numbers.push(elipsis)
    const max = Math.min(
      Math.max(3 + visibility * 2, min + visibility * 2),
      count - 1,
    )
    for (let i = Math.min(min, count - 2 - 2 * visibility); i <= max; i++) {
      page_numbers.push(number(i))
    }
    if (max < count - 1) page_numbers.push(elipsis)
    page_numbers.push(number(count))

    return page_numbers
  }

  render() {
    if (this.props.total_items < this.props.per_page) return null
    return (
      <div className={this.props.className} style={this.props.style}>
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

export default PaginationControls

import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { computed } from "mobx"

import decorate from "lib/utils/decorate"
import { styled, t } from "lib/utils/theme"

export class PaginationControls extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    storePageName: PropTypes.string,
    total_records: PropTypes.number.isRequired,
  }

  static defaultProps = {
    storePageName: null,
  }

  changePage(page_number) {
    const { storePageName, location } = this.props

    if (storePageName) {
      this.props.history.replace({
        state: { ...location.state, [`${storePageName}PageNumber`]: page_number },
      })
    }
    this.props.onPageChange(page_number)
  }

  @computed
  get page() {
    const { storePageName, page } = this.props
    const locationPage =
      this.props.location.state && this.props.location.state[`${storePageName}PageNumber`]

    return locationPage || page
  }

  totalPages() {
    const { total_records, per_page } = this.props
    return Math.ceil(total_records / per_page)
  }

  firstPage() {
    return this.page === 1
  }

  lastPage() {
    return this.page === this.totalPages()
  }

  renderLeft() {
    const className = `pagination__button`
    if (this.firstPage()) {
      return <div className={`${className} disabled`}>Left</div>
    }
    return (
      <div className={className} onClick={() => this.changePage(this.page - 1)}>
        Left
      </div>
    )
  }

  renderRight() {
    const className = `pagination__button`
    if (this.lastPage()) {
      return <div className={`${className} disabled`}>Right</div>
    }
    return (
      <div className={className} onClick={() => this.changePage(this.page + 1)}>
        Right
      </div>
    )
  }

  renderPageNumbers() {
    const page_numbers = []
    for (let i = 1; i <= this.totalPages(); i++) {
      if (i === this.page) {
        page_numbers.push(
          <div className="pagination__button current_page" key={i}>
            <span>{i}</span>
          </div>,
        )
      } else {
        page_numbers.push(
          <div className="pagination__button" key={i} onClick={() => this.changePage(i)}>
            <span>{i}</span>
          </div>,
        )
      }
    }
    return page_numbers
  }

  render() {
    const { className } = this.props
    return (
      <div className={`${className} pagination`}>
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
  withRouter,
  observer,
  PaginationControls,
)

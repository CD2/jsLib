import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import { styled, t } from "lib/utils/theme"
import List from "lib/components/list"
import { popover } from "lib/utils/common_styles"
import decorate from "lib/utils/decorate"
import Result from "./Result"

export class ResultsArea extends React.Component {
  static propTypes = {
    anyResults: PropTypes.bool,
    className: PropTypes.string,
    models: PropTypes.object.isRequired,
    noResultsText: PropTypes.string,
    onClick: PropTypes.func,
    query: PropTypes.string,
    results: PropTypes.array,
  }

  componentDidMount() {
    window.addEventListener(`keydown`, this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.handleKeyDown)
  }

  @observable selectedIndex = 0

  handleScrollTo = pos => {
    if (!this.elem) return
    this.elem.scrollTop = pos - 200
  }

  handleKeyDown = e => {
    switch (e.key) {
    case `ArrowDown`:
      this.handleArrowDown()
      break
    case `ArrowUp`:
      this.handleArrowUp()
      break
    default:
      return null
    }
  }

  @action
  handleArrowDown() {
    if (this.selectedIndex < this.props.results.length - 1) {
      this.selectedIndex = this.selectedIndex + 1
    }
  }

  @action
  handleArrowUp() {
    if (this.selectedIndex > 0) {
      this.selectedIndex = this.selectedIndex - 1
    }
  }

  getResultKey(result) {
    const { searchable_type, searchable_id } = result
    return `${searchable_type}--${searchable_id}`
  }

  renderResult = (result, i) => {
    const { selectedIndex } = this
    return (
      <List.Item key={this.getResultKey(result)}>
        <Result
          type={result.searchable_type}
          result={result}
          selected={selectedIndex === i}
          models={this.props.models}
          onScrollTo={this.handleScrollTo}
          onClick={this.props.onClick}
        />
      </List.Item>
    )
  }

  renderListItems() {
    const { anyResults, results, noResultsText } = this.props
    if (anyResults) return results.map(this.renderResult)
    return(
      <List.Item>
        { noResultsText ? noResultsText : <a className="search-dropdown__result">Sorry, no results found</a>}
      </List.Item>
    )
  }

  setRef = elem => (this.elem = elem)

  render() {
    const { className } = this.props
    return (
      <div className={className} ref={this.setRef}>
        <List spacing="none" className="search-dropdown" separator>
          {this.renderListItems()}
        </List>
      </div>
    )
  }
}
export default decorate(
  styled`
    ${popover}
    width: 500px;
    margin-top: -10px;
    font-size: 0.9em;
    z-index: 5000;
    max-width: 100%;
    
    .search-dropdown {
      position: relative;
      z-index: 20001;

      &__result {
        padding: 8px;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        color: ${t(`text`)} !important;

        p { 
          margin: 0 
        }

        b {
          color: ${t(`lightText`)};
          font-size: 0.8em;
        }

        &:hover, &--selected {
          background-color: ${t(`border`)};
        }
        
        @media (min-width: 400px) {
          white-space: nowrap;
        }
      }
    }
  `,
  observer,
  ResultsArea,
)

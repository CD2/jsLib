import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

import { redirect } from "lib/utils/router"

export default class Result extends React.Component {
  static propTypes = {
    models: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onScrollTo: PropTypes.func,
    result: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    type: PropTypes.string,
  }

  componentDidMount() {
    window.addEventListener(`keydown`, this.handleKeyDown)
  }

  componentWillReceiveProps(props) {
    if (props.selected && !this.props.selected) {
      this.props.onScrollTo(this.elem.offsetTop)
    }
  }

  componentWillUnmount() {
    window.removeEventListener(`keydown`, this.handleKeyDown)
  }

  goToUrl = () => {
    const url = `/${this.props.models[this.props.type]}/${this.props.result.searchable_id}`
    redirect(url)
  }

  handleKeyDown = e => {
    if (this.props.selected && e.key === `Enter`) {
      this.goToUrl()
    }
  }

  className() {
    let className = `search-dropdown__result`
    if (this.props.selected) className += ` search-dropdown__result--selected`
    return className
  }

  render() {
    const { type, models } = this.props
    return (
      <Link
        className={this.className()}
        ref={elem => (this.elem = elem)}
        to={`/${models[type]}/${this.props.result.searchable_id}`}
        style={{ color: `#444` }}
        onClick={this.props.onClick}
      >
        <p>{this.props.result.content}</p>
      </Link>
    )
  }
}

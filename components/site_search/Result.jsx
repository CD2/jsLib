import React from 'react'
import PropTypes from 'prop-types'
import decorate from 'lib/utils/decorate'
import { Link } from 'react-router-dom'
import { redirect } from 'lib/utils/router'

export class Result extends React.Component {

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
    const url = `/${this.getPathFromResultType()}/${this.props.result.searchable_id}`
    redirect(url)
  }

  handleKeyDown = (e) => {
    if (this.props.selected && e.key === `Enter`) {
      this.goToUrl()
    }
  }

  className() {
    let className = `search-dropdown__result`
    if (this.props.selected) className += ` search-dropdown__result--selected`
    return className
  }

  handleClick(){

  }

  render() {
    const { type, models } = this.props
    return (
      <Link
        className={this.className()}
        ref={elem => this.elem = elem}
        to={`/${models[type]}/${this.props.result.searchable_id}`}
        onClick={this.props.onClick}
        style={{color: '#444'}}
      >
        <b>{this.props.type}</b>
        <p>{this.props.result.content}</p>
      </Link>
    )
  }

}
export default decorate(Result)

import React from 'react'
import PropTypes from 'prop-types'

export default class Tab extends React.Component {

  static propTypes = {
    heading: PropTypes.string.isRequired,
    children: PropTypes.node,

    //automatic props
    renderHead: PropTypes.bool,
    onTabHeadClick: PropTypes.func,
    selected: PropTypes.bool,
    tabKey: PropTypes.any,
  }

  static defaultProps = {
    renderHead: false,
  }

  handleTabHeadClick = () => {
    const { onTabHeadClick, tabKey } = this.props
    onTabHeadClick(tabKey)
  }

  renderHead() {
    const { heading, selected, name } = this.props
    const className = selected === name ? `selected` : ``
    return <div onClick={this.handleTabHeadClick} className={className}>{heading}</div>
  }

  render() {
    const { renderHead, children } = this.props
    if (renderHead) return this.renderHead()
    return (
      <div>
        {children}
      </div>
    )
  }

}

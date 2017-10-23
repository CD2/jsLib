import React from 'react'
import PropTypes from 'prop-types'

export default class Tab extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string.isRequired,
    onTabHeadClick: PropTypes.func,
    renderHead: PropTypes.bool,
    selected: PropTypes.any,
    tabKey: PropTypes.any,
  }

  static defaultProps = {
    renderHead: false,
  }

  handleTabHeadClick = () => {
    const { onTabHeadClick, tabKey } = this.props
    onTabHeadClick(tabKey)
  }

  renderHead = () => {
    const { heading, selected, tabKey } = this.props
    const className = selected === tabKey ? `selected` : ``
    return <div className={className} onClick={this.handleTabHeadClick}>{heading}</div>
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

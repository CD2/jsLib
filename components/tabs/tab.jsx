import React from 'react'
import PropTypes from 'prop-types'

export default class Tab extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    heading: PropTypes.string.isRequired,
    //automatic props
    name: PropTypes.string,
    onTabHeadClick: PropTypes.func,
    renderHead: PropTypes.bool,
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

import React from 'react'
import PropTypes from 'prop-types'

export default class Tab extends React.Component {

  static propTypes = {
    key: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    children: PropTypes.node,

    //automatic props
    renderHead: PropTypes.boolean,
    onTabHeadClick: PropTypes.func.isRequired,
    selected: PropTypes.boolean,
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
    const { heading, selected, key } = this.props
    const className = selected === key ? 'selected' : ''
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

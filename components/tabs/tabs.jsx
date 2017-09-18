import React from 'react'
import { styled, t } from 'utils/theme'

@styled`
  background-color: ${t('background')};
  .tab-content {
    padding: ${t('gutterWidth', w=>w/2)}px;
  }
  .tab-heads {
    display: flex;
    border-top: 1px solid ${t('border')};
    border-bottom: 1px solid ${t('border')};

    > div {
      padding: 10px ${t('gutterWidth')}px 10px;
      font-size: 0.9em;
      color: ${t('lightText')};
      cursor: pointer;
      filter: brightness(0.95);

      &.selected {
        color: black;
        font-weight: 600;
      }
    }
  }
`
export default class Tabs extends React.Component {

  static propTypes = {
  }

  state = {
    selected: null,
  }

  handleTabHeadClick = (key) => {
    this.setState({selected: key})
  }

  renderTabHeads() {
    const headings = React.Children.map(this.props.children, child => {
      if (!child) return null
      return React.cloneElement(child, {
        ...child.props,
        tabKey: child.tabName,
        renderHead: true,
        onTabHeadClick: this.handleTabHeadClick,
        className: 'tab-head'
      })
    })
    return (<div className="tab-heads">{headings}</div>)
  }

  renderSelectedTab() {
    let tab = null
    const { selected } = this.state
    React.Children.forEach(this.props.children, child => {
      if (!child) return null
      if (tab === null) tab=child //default to first child
      if (child.tabName === selected) tab=child
    })
    return <div className="tab-content">{tab}</div>
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderTabHeads()}
        {this.renderSelectedTab()}
      </div>
    )
  }

}

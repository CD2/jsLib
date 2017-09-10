import React from 'react'
import { styled, t } from 'utils/theme'

@styled`
  background-color: ${t('background')};
  .tab-content {
    padding: ${t('gutterWidth', w=>w/2)}px;
  }
  .tab-heads {
    display: flex;
    background: white;
    
    > div {
      padding: 20px 50px;
      background: ${t('background')};
      cursor: pointer;
      filter: brightness(0.95);
      &.selected {
        filter: brightness(1);
        border-top: 3px solid ${t('primary')};
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
    console.log(key)
    this.setState({selected: key})
  }

  renderTabHeads() {
    const headings = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...child.props,
        tabKey: child.key,
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
      if (tab === null) tab=child //default to first child
      if (child.key === selected) tab=child
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

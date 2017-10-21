import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

@styled`
  .tab-content {
    padding: 25px;
    border-top: 5px solid #ddd;
  }
  .tab-heads {
    display: flex;

    > div {
      padding: ${t(`gutterWidth`, w=>w/2)}px;
      font-weight: 600;
      cursor: pointer;
      filter: brightness(0.95);
      &.selected {
        filter: brightness(1);
        border-bottom: 5px solid ${t(`primary`)};
        margin-bottom: -5px;
      }
    }
  }
`
@observer
export default class Tabs extends React.Component {

  static propTypes = {
    children: PropTypes.object,
    className: PropTypes.string,
    current: PropTypes.string,
    onChange: PropTypes.func,
  }

  @observable selected = null

  getSelected() {
    const { current, children } = this.props
    const selected = current !== undefined ? current : this.selected

    return selected !== null ? selected : children[0].key
  }

  handleTabHeadClick = (key) => {
    const { onChange } = this.props
    this.selected = key
    if (onChange) onChange(key)
  }

  renderTabHeads() {
    const headings = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        ...child.props,
        tabKey: child.key,
        renderHead: true,
        onTabHeadClick: this.handleTabHeadClick,
        className: `tab-head`,
        selected: this.getSelected(),
      })
    })
    return (<div className="tab-heads">{headings}</div>)
  }

  renderSelectedTab() {
    const selected = this.getSelected()
    let tab = null
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

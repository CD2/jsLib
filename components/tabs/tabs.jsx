import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'lib/utils/theme'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { withRouter } from 'react-router-dom'

@styled`
  .tab-content {
    padding: 25px 0 0;
    border-top: 1px solid #ddd;
  }
  .tab-heads {
    display: flex;

    > div {
      padding: ${t(`gutterWidth`, w=>w/2)}px;
      cursor: pointer;
      opacity: 0.7;
      &.selected {
        opacity: 1;
        border-bottom: 3px solid ${t(`primary`)};
        margin-bottom: -3px;
      }
    }
  }
`
@withRouter
@observer
export default class Tabs extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    current: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    onChange: PropTypes.func,
    storeCurrentName: PropTypes.string,
  }

  static defaultProps = {
    current: null,
    storeCurrentName: null,
  }

  componentDidMount() {
    const { onChange } = this.props

    onChange && onChange(this.getSelected)
  }

  @observable selected = null

  @computed get getSelected() {
    const { current, children, storeCurrentName } = this.props
    const locationCurrent = this.props.location.state
      && this.props.location.state[`${storeCurrentName}TabKey`]

    if (!this.selected && !current && locationCurrent) return locationCurrent
    const selected = current !== null ? current : this.selected
    if (!children[0]) return
    return selected !== null ? selected : children[0].key
  }

  @action handleTabHeadClick = (key) => {
    const { onChange, storeCurrentName, location } = this.props
    this.selected = key
    if (storeCurrentName) {
      this.props.history.replace({
        state: { ...location.state, [`${storeCurrentName}TabKey`]: key }
      })
    }
    if (onChange) onChange(key)
  }

  renderTabHeads() {
    const headings = React.Children.map(this.props.children, child => {
      if (!child) return
      return React.cloneElement(child, {
        ...child.props,
        tabKey: child.key,
        renderHead: true,
        onTabHeadClick: this.handleTabHeadClick,
        className: `tab-head`,
        selected: this.getSelected,
      })
    })
    return (<div className="tab-heads">{headings}</div>)
  }
  //default to first child
  renderSelectedTab() {
    const selected = this.getSelected
    let tab = null
    React.Children.forEach(this.props.children, child => {
      if (!child) return
      if (tab === null) tab=child
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

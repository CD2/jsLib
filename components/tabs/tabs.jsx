import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { computed } from "mobx"
import Grid from "../grid"
import Wrapper from "../wrapper"
import windowStore from "stores/window"

@observer
export default class Tabs extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    onChange: PropTypes.func,
    storeCurrentName: PropTypes.string,
    thick: PropTypes.bool,
    vertical: PropTypes.bool,
  }

  static defaultProps = {
    children: [],
  }

  componentWillUnmount() {
    this.removeParams([`page`, `tab`, `query`])
  }

  @computed
  get getSelected() {
    if (this.props.children.length > 0) {
      return windowStore.location.params.get(`tab`) || this.props.children[0].key
    }
  }

  handleTabHeadClick = key => {
    const { onChange } = this.props
    onChange && onChange(key)
    windowStore.location.params.set(`tab`, key)
    this.removeParams([`page`, `query`])
  }

  removeParams(params = []) {
    params.map(param => {
      windowStore.location.params.delete(param)
    })
  }

  renderTabHeads() {
    const headings = React.Children.map(this.props.children, child => {
      if (!child) return
      return React.cloneElement(child, {
        ...child.props,
        tabKey: child.key,
        key: Math.random(),
        renderHead: true,
        onTabHeadClick: this.handleTabHeadClick,
        className: `tab-head`,
        selected: Array.isArray(this.props.children) ? this.getSelected : child.key,
      })
    })
    return <div className="tab-heads">{headings}</div>
  }

  renderSelectedTab() {
    React.Children.forEach(this.props.children, child => {
      if (child && child.key === this.getSelected) this.tab = child
    })
    return <div className="tab-content">{this.tab}</div>
  }

  render() {
    if (this.props.vertical) {
      return (
        <Grid columns={5} className={this.props.className}>
          <Grid.Item>
            <Wrapper floating noSpacing noGutters>
              {this.renderTabHeads()}
            </Wrapper>
          </Grid.Item>
          <Grid.Item colSpan={4}>{this.renderSelectedTab()}</Grid.Item>
        </Grid>
      )
    }
    return (
      <div className={`tabs ${this.props.className}`}>
        {this.renderTabHeads()}
        {this.renderSelectedTab()}
      </div>
    )
  }
}

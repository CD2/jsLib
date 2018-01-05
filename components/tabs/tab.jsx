import React from "react"
import PropTypes from "prop-types"
import Image from "../image"
import Grid from "../grid";

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
    const { heading, selected, tabKey, icon } = this.props
    const className = selected === tabKey ? `selected` : ``
    return (
      <div className={className} onClick={this.handleTabHeadClick}>
        <Grid>
          {icon && <Grid.Item><Image width={30} height={20} background contain defaultSrc={icon} /></Grid.Item>}
          <Grid.Item>{heading}</Grid.Item>
        </Grid>
      </div>
    )
  }

  render() {
    const { renderHead, children } = this.props
    if (renderHead) return this.renderHead()
    return <div>{children}</div>
  }
}

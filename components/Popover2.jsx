import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { computed } from "mobx"
import theme from "styles/theme"

@observer
export default class Popover2 extends React.Component {
  // TODO refactor this a bit to take a position prop to determine horizontal placement
  // could also take prop for side of div to render on
  // also the styling is a bit out of hand

  static propTypes = {
    backgroundColor: PropTypes.string,
    centered: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    show: PropTypes.bool,
    triangleHeight: PropTypes.number,
    triangleWidth: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    width: 200,
    height: 175,
    triangleHeight: 10,
    triangleWidth: 8,
    backgroundColor: `white`,
  }

  hiddenStyle = {
    position: `absolute`,
    right: this.props.centered ? `calc(50% - ${this.props.width / 2}px)` : 0,
    transition: theme.globalTransitionSpeed,
    opacity: 0,
    width: this.props.width,
    transform: `scale(0.95)`,
    overflow: `hidden`,
    maxHeight: 0,
    zIndex: 3,
  }

  showStyle = {
    overflow: `initial`,
    maxHeight: 1111,
    opacity: 1,
    transform: `scale(1)`,
  }

  triangleStyle = {
    display: `inline-block`,
    width: 0,
    height: 0,
    borderStyle: `solid`,
    borderWidth: `0 ${this.props.triangleWidth}px ${this.props.triangleHeight}px ${
      this.props.triangleWidth
    }px`,
    borderColor: `transparent transparent ${this.props.backgroundColor} transparent`,
  }

  containerStyle = {
    backgroundColor: `${this.props.backgroundColor}`,
    maxHeight: this.props.height,
    overflowY: `auto`,
    boxShadow: theme.shadow3,
    borderRadius: theme.borderRadii.panel
  }

  itemStyle = `
    .popover__item {
      background-color: white;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 8px 16px;
      cursor: pointer;
      transition: ${theme.globalTransitionSpeed};
    }
    .popover__item:hover {
      background-color: ${theme.greyBackground};
    }
    .popover__item span {
      margin-left: 16px;
    }
  `

  @computed
  get style() {
    return this.props.show ? { ...this.hiddenStyle, ...this.showStyle } : this.hiddenStyle
  }

  render() {
    const { centered, onClick } = this.props
    return (
      <div className="popover" style={this.style} onClick={onClick}>
        <style>{this.itemStyle}</style>
        <div
          style={{
            textAlign: centered ? `center` : `right`,
            paddingRight: centered ? 0 : 8,
            fontSize: 0,
            lineHeight: 0,
          }}
        >
          <div style={this.triangleStyle} />
        </div>
        <div style={this.containerStyle}>{this.props.children}</div>
      </div>
    )
  }
}

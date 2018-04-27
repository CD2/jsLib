import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { computed } from "mobx"
import theme from "styles/theme"

@observer
export default class Popover2 extends React.Component {

  static propTypes = {
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
  }

  hiddenStyle = {
    position: `absolute`,
    right: 0,
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
    borderWidth: `0 ${this.props.triangleWidth}px ${this.props.triangleHeight}px ${this.props.triangleWidth}px`,
    borderColor: `transparent transparent white transparent`,
  }

  containerStyle = {
    backgroundColor: `white`,
    maxHeight: this.props.height,
    overflowY: `auto`,
    boxShadow: theme.shadow5,
  }

  @computed
  get style() {
    return this.props.show ? { ...this.hiddenStyle, ...this.showStyle } : this.hiddenStyle
  }

  render() {
    return(
      <div className={this.props.className} style={this.style}>
        <div style={{ textAlign: `right`, paddingRight: 8, fontSize: 0 }}>
          <div style={this.triangleStyle} />
        </div>
        <div style={this.containerStyle} >
          {this.props.children}
        </div>
      </div>
    )
  }

}
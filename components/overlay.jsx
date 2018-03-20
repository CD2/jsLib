import React from "react"
import PropTypes from "prop-types"
import { styled } from "lib/utils/theme"
import decorate from "lib/utils/decorate"

export class Overlay extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    clickThrough: PropTypes.bool,
    onClick: PropTypes.func,
    overlayClassName: PropTypes.string,
    visible: PropTypes.bool,
  }

  static defaultProps = {
    visible: false,
    clickThrough: false,
    className: ``,
    overlayClassName: ``,
  }

  handleClick = e => {
    const { clickThrough, onClick } = this.props
    if (onClick) onClick(e)
    if (clickThrough) {
      e.target.style.pointerEvents = `none`
      const element = document.elementFromPoint(e.pageX, e.pageY)
      element && element.click()
      e.target.style.pointerEvents = ``
    }
  }

  render() {
    let className = `${this.props.className} ${this.props.overlayClassName}`
    if (this.props.visible) className += ` visible`

    return (
      <div className={className} onClick={this.handleClick}>
        {this.props.visible && <style>{`body { overflow: hidden; }`}</style>}
      </div>
    )
  }
}
export default decorate(
  styled`

    height: 100%;
    left: 0;
    opacity: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 24999;
    ${({ belowAppBar }) => {
    if (belowAppBar) {
      return `z-index: 4999;`
    }
  }}
    &.visible {
      background: #000;
      cursor: pointer;
      opacity: .7;
    }
  `,
  Overlay,
)

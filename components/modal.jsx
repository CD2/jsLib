import React from "react"
import PropTypes from "prop-types"
import Overlay from "lib/components/overlay"
import { styled, t } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
import windowStore from "stores/window"
import FaIcon from "./fa_icon"

export class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClose: PropTypes.func,
    showClose: PropTypes.bool,
  }

  handleClose = () => {
    const { onClose = () => {} } = this.props
    onClose()
  }

  render() {
    const { className, children, showClose } = this.props
    return (
      <div className={`${className}`}>
        <div className={`modal ${windowStore.isSmall ? `modal--s` : ``}`}>
          {showClose && (
            <div className="close-modal" onClick={this.handleClose}>
              <FaIcon icon={`cross`} size={1.2} />
            </div>
          )}
          {children}
        </div>
        <Overlay visible onClick={this.handleClose} />
      </div>
    )
  }
}

export default decorate(
  styled`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    z-index: 250000;
    padding-bottom: 100px;
    .close-modal {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 100;
      cursor: pointer;
    }
    .modal {
      position: relative;
      border-radius: ${t(`borderRadii.modal`)};
      z-index: 250000;      
      width: 90%;
      max-width: 800px;
      max-height: 90%;
      overflow: auto;
      position: relative;
      left: 50%;
      top: 10%;
      transform: translateX(-50%);
      ${({ large }) => {
    if (large) {
      return `
              max-width: 9999px;
              max-height: 9999px;
              height: 80vh;`
    }
  }}
      ${({ padding, theme, noPad, background }) => {
    if (padding) return `padding: ${padding}px;`
    if (!noPad) return `padding: ${theme.gutterWidth.value}px;`
  }}
      ${({ background }) => {
    if (background) return `background-color: ${background};`
    return `background-color: white;`
  }}
      ${({ narrow }) => {
    if (narrow) return `max-width: 500px;`
  }}
      &--s {
        max-height: 450px;
      }

    }
  `,
  Modal,
)

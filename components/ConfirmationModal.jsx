import React from "react"
import PropTypes from "prop-types"
import Overlay from "lib/components/overlay"
import { styled, t } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
import windowStore from "stores/window"
import FaIcon from "./fa_icon"
import Modal from "./modal"
import SectionIntro from "./SectionIntro"
import Button from "./button"

export class ConfirmationModal extends React.Component {
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

  handleConfirm = () => {
    this.props.onConfirm()
  }

  handleCancel = () => {
    this.props.onCancel()
  }

  render() {
    const { className, title, body } = this.props
    return (
      <Modal onClose={this.handleCancel} narrow>
        <SectionIntro title={title} heading={2} noPad>
          <h3>{body}</h3>

          <Button onClick={this.handleConfirm}>Confirm</Button>
          <Button buttonStyle="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
        </SectionIntro>
      </Modal>
    )
  }
}

export default ConfirmationModal

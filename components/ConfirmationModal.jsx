import React from "react"
import PropTypes from "prop-types"
import Modal from "./modal"
import SectionIntro from "./SectionIntro"
import { Button } from "components/parts/StyledComponents"

export class ConfirmationModal extends React.Component {
  static propTypes = {
    body: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func,
    showClose: PropTypes.bool,
    title: PropTypes.string,
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
    const { title, body } = this.props
    return (
      <Modal narrow onClose={this.handleCancel}>
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

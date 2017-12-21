import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import Modal from 'lib/components/modal'
import ModalStore from 'lib/utils/modal_store'
import Button from 'lib/components/button'
@observer
export default class OrderForm extends React.Component {

  static propTypes = {
    update: PropTypes.bool,
  }

  componentDidMount(){
  }

  @action handleCloseModal = () => ModalStore.removeLast()
  renderCloseButton = () => {
    return (
      <Button
        id="modal_close"
        aria-label="close"
        onClick={this.handleCloseModal}
      >
      X
      </Button>
    )
  }
  render() {
    if (ModalStore.hasContents) {
      return (
        <Modal onClose={this.handleCloseModal}>
          {this.renderCloseButton()}
          {ModalStore.getLast()}
        </Modal>
      )
    }

    return null
  }

}

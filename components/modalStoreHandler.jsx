import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { action } from 'mobx'
import Modal from 'lib/components/modal'
import ModalStore from 'lib/utils/modal_store'

@observer
export default class OrderForm extends React.Component {

  static propTypes = {
    update: PropTypes.bool,
  }

  @action handleCloseModal = () => ModalStore.removeLast()

  render() {
    if (ModalStore.hasContents) {
      return (
        <Modal onClose={this.handleCloseModal}>
          <div onClick={this.handleCloseModal}>X</div>
          {ModalStore.getLast()}
        </Modal>
      )
    }

    return null
  }

}

import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import Modal from 'lib/components/modal'
import ModalStore from 'lib/utils/modal_store'
@observer
export default class OrderForm extends React.Component {

  static propTypes = {
    order: PropTypes.object,
    order_id: PropTypes.number,
    update: PropTypes.bool,
    reload: PropTypes.func,
  }

  @action closeModal = () => {
    ModalStore.removeLast()
  }

  render() {
    return (
      ModalStore.hasContents ? <Modal onClose={this.closeModal}>{ModalStore.getLast()}</Modal> : null
    )
  }

}

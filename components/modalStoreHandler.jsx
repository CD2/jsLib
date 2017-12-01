import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import Modal from 'lib/components/modal'
import ModalStore from 'lib/utils/modal_store'
import FaIcon from 'lib/components/fa_icon'
@observer
export default class OrderForm extends React.Component {

  static propTypes = {
    update: PropTypes.bool,
    reload: PropTypes.func,
  }

  @action closeModal = () => {
    ModalStore.removeLast()
  }

  render() {
    return (
      ModalStore.hasContents ? <Modal onClose={this.closeModal}><div onClick={this.closeModal}>X</div><FaIcon icon={`cross`} size={1} />{ModalStore.getLast()}</Modal> : null
    )
  }

}

import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { action } from "mobx"
import { redirect } from "lib/utils/router"
import Button from "lib/components/button"
import ModalStore from "lib/utils/modal_store"

@observer
export default class DeleteButton extends React.Component {
  static propTypes = {
    content: PropTypes.any,
    cord: PropTypes.object.isRequired,
    extraAction: PropTypes.func,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    message: PropTypes.string,
    name: PropTypes.string,
    redirect: PropTypes.string,
    reloadParent: PropTypes.func,
  }

  static defaultProps = {
    redirect: null,
    reloadParent: null,
  }

  @action
  handleOpenWarning = (e = null) => {
    e && e.preventDefault()
    e && e.stopPropagation()
    ModalStore.addItem(this.renderModal())
  }

  handleDelete = e => {
    e && e.preventDefault()
    e && e.stopPropagation()
    const { cord, id, reloadParent, redirect: redirectPath } = this.props

    cord.perform(`destroy`, { ids: [id] }).then(() => {
      ModalStore.removeLast()
      reloadParent && reloadParent()
      this.props.extraAction && this.props.extraAction()
      if (redirectPath) redirect(redirectPath)
    })
  }

  renderModal = () => (
    <div style={{ textAlign: `left` }}>
      <p>
        {this.props.message
          ? this.props.message
          : `Are you sure you want to delete ${this.props.name}`}
      </p>
      <div>
        <Button buttonStyle="delete" onClick={this.handleDelete}>
          Delete
        </Button>
        <Button buttonStyle="cancel" onClick={() => ModalStore.removeLast()}>
          Cancel
        </Button>
      </div>
    </div>
  )

  render() {
    return (
      <div>
        <Button onClick={this.handleOpenWarning}>
          {this.props.content ? this.props.content : `Delete`}
        </Button>
      </div>
    )
  }
}

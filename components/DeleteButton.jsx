import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { redirect } from 'lib/utils/router'

import Button from 'lib/components/button'
import Modal from 'lib/components/modal'

@observer
export default class DeleteButton extends React.Component {

  static propTypes = {
    cord: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    message: PropTypes.string,
    name: PropTypes.string,
    redirect: PropTypes.string,
    reloadParent: PropTypes.func,
  };

  static defaultProps = {
    redirect: null,
    reloadParent: null,
  };

  @observable open = false

  @action handleToggleWarning = (e = null) => {
    e && e.preventDefault()
    e && e.stopPropagation()
    this.open = !this.open
  }

  handleDelete = (e) => {
    e && e.preventDefault()
    e && e.stopPropagation()
    const { cord, id, reloadParent, redirect: redirectPath } = this.props

    cord.perform(`destroy`, { ids: [id] }).then(() => {
      this.handleToggleWarning()
      reloadParent && reloadParent()
      if (redirectPath) redirect(redirectPath)
    })
  }

  renderModal = () => (
    <Modal onClose={this.handleToggleWarning}>
      <div style={{ textAlign: `left` }}>
        <p>
          {
            this.props.message
              ? this.props.message
              : `Are you sure you want to delete ${this.props.name}`
          }
        </p>
        <div>
          <Button buttonStyle="delete" onClick={this.handleDelete}>Delete</Button>
          <Button buttonStyle="cancel" onClick={this.handleToggleWarning}>Cancel</Button>
        </div>
      </div>
    </Modal>
  )

  render = () => (
    <div>
      <Button onClick={this.handleToggleWarning}>Delete</Button>
      {this.open && this.renderModal()}
    </div>
  )

}

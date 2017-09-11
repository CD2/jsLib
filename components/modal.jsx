import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'lib/components/overlay'


export default class Modal extends React.Component {

  static propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  }

  handleClose = () => {
    const { onClose=()=>{} } = this.props
    onClose()
  }

  render() {
    return (
      <div className='modal_wrapper'>
        <div className='modal'>
          {this.props.children}
        </div>
        <Overlay visible onClick={this.handleClose}/>
      </div>
    )
  }

}

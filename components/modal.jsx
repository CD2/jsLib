import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'lib/components/overlay'
import { active_card } from 'utils/common_styles'
import { styled, t } from 'utils/theme'
import decorate from 'utils/decorate'

export class Modal extends React.Component {

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
      <div className={this.props.className}>
        <div className="modal">
          {this.props.children}
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
    bottom: 0;
    z-index: 10000;
    .modal {
      ${active_card};
      z-index: 100000;
      padding: ${t(`gutterWidth`)}px;
      width: 90%;
      max-width: 600px;
      max-height: 600px;
      overflow: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
    }
  `,
  Modal
)

import React from 'react'
import PropTypes from 'prop-types'
import Overlay from 'lib/components/overlay'
import { active_card } from 'utils/common_styles'
import { styled } from 'utils/theme'
import decorate from 'utils/decorate'
import windowStore from 'stores/window'

export class Modal extends React.Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClose: PropTypes.func,
  }

  handleClose = () => {
    const { onClose=()=>{} } = this.props
    onClose()
  }

  render() {
    const { className, children } = this.props
    return (
      <div className={`${className}`}>
        <div className={`modal ${windowStore.isSmall ? `modal--s` : ``}`}>
          {children}
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
      padding: ${props => props.theme.gutterWidth.value}px;
      width: 90%;
      max-width: 800px;
      max-height: 600px;
      overflow: auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);

      &--s {
        max-height: 390px;
      }

    }
  `,
  Modal
)

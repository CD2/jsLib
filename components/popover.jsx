import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'lib/utils/theme'
import decorate from 'lib/utils/decorate'
import { observer } from 'mobx-react'
import Overlay from 'lib/components/overlay'

export class Popover extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    closeOnOutsideClick: PropTypes.bool,
    containerClassName: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    popoverClassName: PropTypes.string,
  }

  static defaultProps = {
    children: null,
    className: null,
    containerClassName: null,
    open: false,
    onMouseEnter: null,
    onMouseLeave: null,
    closeOnOutsideClick: false,
    onToggle: null,
    popoverClassName: null,
  }

  getClassName() {
    let className = `popover__popover`

    if (this.props.popoverClassName) {
      className += ` ${this.props.popoverClassName}`
    }
    if (this.props.open) {
      className += ` popover__popover--open`
    }

    return className
  }

  render() {
    if(!this.props.open) return null
    return (
      <div className={`${this.props.className} ${this.props.containerClassName}`}>
        <div
          className={this.getClassName()}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {this.props.children}
        </div>
        {this.props.closeOnOutsideClick ? <Overlay clickThrough onClick={this.props.onToggle} /> : null}
      </div>
    )
  }

}

export default decorate(
  styled`
  position: relative;
  .popover__popover {
    position: absolute;
    display: none;
    pointer-events: none;
    z-index: 11000;
    background-color: white;
    width: auto;
    left: 0px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 400;
    font-size: 0.9rem;
    box-shadow: 0 5px 8px rgba(0,0,0,.16);
    z-index: 100000;
    &--open {
      display: block;
      pointer-events: auto;
      opacity: 1;
    }
  }
  `,
  observer,
  Popover
)

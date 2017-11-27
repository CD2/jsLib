import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'lib/utils/theme'
import decorate from 'lib/utils/decorate'

import Overlay from 'lib/components/overlay'

export class Popover extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    closeOnOutsideClick: PropTypes.bool,
    containerClassName: PropTypes.string,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    open: PropTypes.bool,
    toggle: PropTypes.func,
  }

  static defaultProps = {
    children: null,
    className: null,
    containerClassName: null,
    open: false,
    onMouseEnter: null,
    onMouseLeave: null,
    closeOnOutsideClick: false,
    toggle: null,
  }

  getClassName() {
    let className = `popover__popover`

    if(this.props.className) {
      className += ` ${this.props.className}`
    }
    if(this.props.open) {
      className += ` popover__popover--open`
    }

    return className
  }

  renderOverlay() {
    return(
      <Overlay
        className={this.props.open ? `popover__overlay--open` : `popover__overlay`}
        visible={this.props.open}
        onClick={this.props.toggle}
      />
    )
  }

  render() {
    return(
      <span className={`popover ${this.props.containerClassName}`}>
        <div
          className={this.getClassName()}
          onMouseEnter={this.props.onMouseEnter}
          onMouseLeave={this.props.onMouseLeave}
        >
          {this.props.children}
        </div>
        {this.props.closeOnOutsideClick ? this.renderOverlay() : null}
      </span>
    )
  }

}
export default decorate(
  styled`
  .popover {
    position: relative;
  }
  .popover__popover {
    position: absolute;
    display: none;
    pointer-events: none;
    z-index: 11000;
    background-color: white;
    width: auto;
    bottom: 100%;
    left: 0px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 400;
    font-size: 0.9rem;
    box-shadow: 0 5px 8px rgba(0,0,0,.16);

    &--open {
      display: block;
      pointer-events: auto;
      opacity: 1;
    }
  }

  .popover__overlay {
    display: none;

    &--open {
      position: relative;
      display: block;
      right: 0;
      left: 0;
      top: 0;
      bottom: 0;
    }
  }
  `,
  Popover
)

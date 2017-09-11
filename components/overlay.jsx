import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'utils/theme'

@styled`

  height: 100%;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 4999;

  &.visible {
    background: $black;
    cursor: pointer;
    opacity: .4;
  }


`
export default class overlay extends React.Component {

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    className: PropTypes.string,
  }

  static defaultProps = {
    visible: false,
    className: '',
  }


  render() {
    let className = this.props.className
    if (this.props.visible) className += ' visible'

    return (<div className={className} onClick={this.props.onClick}/>)
  }

}

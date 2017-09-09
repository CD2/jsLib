import React from 'react'
import PropTypes from 'prop-types'

import 'lib/styles/overlay.scss';

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

  className() {
    let className = `overlay ${this.props.className}`
    if (this.props.visible) className += ' overlay__visible'
    return className
  }

  render() {
    return (<div className={this.className()} onClick={this.props.onClick}/>)
  }

}

import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'
import { Link } from 'react-router-dom'
import VisibilitySensor from 'react-visibility-sensor'

import { styled, t } from 'lib/utils/theme'

@styled`
  &.visibility {
    transition: ${t(`drawTransitionSpeed`)};
    opacity: 1;
  }
  &.visibility--false {
    opacity: 0.01;
    transform: translateY(50%);
  }
  &.visibility--false-right {
    opacity: 0.01;
    transform: translateX(50%);
  }
  &.visibility--false-left {
    opacity: 0.01;
    transform: translateX(-50%);
  }
  &.visibility--true {
    opacity: 1;
    transform: translateY(0);
    transform: translateX(0);
  }
`
@observer
export default class FadeIn extends React.Component {

  static propTypes = {
    left: PropTypes.bool,
    right: PropTypes.bool
  }

  @observable visible = false
  @computed get className() {
    const { left, right } = this.props
    const str = `visibility visibility--false${right ? `-right` : ``}${left ? `-left` : ``}`
    return this.visible ? `visibility visibility--true` : str
  }

  onChange = (isVisible) => {
    this.visible = isVisible
  }

  render() {
    const { children, className } = this.props
    return (
      <VisibilitySensor onChange={this.onChange} active={!this.visible} partialVisibility delayedCall intervalDelay={500}>
        <div>
          <div className={`${className} ${this.className}`}>
            {children}
          </div>
        </div>
      </VisibilitySensor>
    )
  }

}

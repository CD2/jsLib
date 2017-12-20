import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, computed, action } from 'mobx'
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
    children: PropTypes.node,
    className: PropTypes.string,
    left: PropTypes.bool,
    right: PropTypes.bool
  }

  @observable visible = false
  @computed get className() {
    const { left, right } = this.props
    const str = `visibility visibility--false${right ? `-right` : ``}${left ? `-left` : ``}`
    return this.visible ? `visibility visibility--true` : str
  }

  @action handleChange = (isVisible) => this.visible = isVisible

  render() {
    const { children, className } = this.props
    return (
      <VisibilitySensor
        active={!this.visible}
        intervalDelay={500}
        partialVisibility
        delayedCall
        onChange={this.handleChange}
      >
        <div>
          <div className={`${className} ${this.className}`}>
            {children}
          </div>
        </div>
      </VisibilitySensor>
    )
  }

}

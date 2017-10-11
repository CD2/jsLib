import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { styled, t } from 'utils/theme'
import { panel } from 'utils/common_styles'
import decorate from 'utils/decorate'

export class Accordion extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    header: PropTypes.node,
    onToggle: PropTypes.func,
    openDefault: PropTypes.bool,
  }

  static defaultProps = {
    openDefault: false,
  }

  @observable open = this.props.openDefault
  @action handleToggle = () => this.open = !this.open

  render() {
    const { header, onToggle } = this.props
    return (
      <div
        className={this.props.className}
        onClick={() => onToggle ? onToggle() : this.handleToggle()}
      >
        {header}
        <div className={`accordion-content ${this.open ? `accordion-content--open`: ``}`}>
          {this.open ? this.props.children : null}
        </div>
      </div>
    )
  }

}
export default decorate(
  styled`
  ${panel}
  margin: 10px 0;

    .accordion-content {
      min-height: 0px;
      opacity: 0;
      overflow: hidden;
      transition: min-height 0.4s, opacity 0.5s;

      &--open {
        min-height: 100px;
        opacity: 1;
      }
    }
  `,
  observer,
  Accordion
)

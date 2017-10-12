import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { styled, t } from 'utils/theme'
import { panel } from 'utils/common_styles'
import decorate from 'utils/decorate'
import { dark_panel } from "../../utils/common_styles";

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
      <div className={this.props.className}>
        <div className="accordion__header" onClick={() => onToggle ? onToggle() : this.handleToggle()}>
          {header}
        </div>
        <div className={`accordion__content ${this.open ? `accordion__content--open`: ``}`}>
          {this.open ? this.props.children : null}
        </div>
      </div>
    )
  }

}
export default decorate(
  styled`
    font-size: 0.9em;
    p { margin: 0; }
    .accordion__header {
      ${dark_panel}
      margin: 10px 0;
      padding: ${t(`gutterWidth`, w=>w/2)}px;
      font-weight: 600;
      cursor: pointer;
      font-size: 0.8em;
    }
    .accordion__content {
      min-height: 0px;
      opacity: 0;
      overflow: hidden;
      transition: min-height 0.4s, opacity 0.5s;

      &--open {
        min-height: 100px;
        opacity: 1;
        position: relative;
        top: -10px;
        padding: 16px;
        background: white;
        border: 1px solid ${t('border')};
        h3 { display: none; }
      }
    }
  `,
  observer,
  Accordion
)

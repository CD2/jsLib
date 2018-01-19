import React from "react"
import PropTypes from "prop-types"

import { computed, action } from "mobx"
import { observer } from "mobx-react"

import tagStore from "lib/stores/Tags"

import { styled, t } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
export class Tag extends React.Component {
  static propTypes = {
    alt_style: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    tag: PropTypes.string.isRequired,
  }

  static defaultProps = {
    disabled: false,
  }

  @action
  handleClick = () => {
    if (this.props.disabled) return null
    const { onClick, tag } = this.props
    this.selected ? tagStore.remove(tag) : tagStore.add(tag)
    if (onClick) onClick()
  }

  @computed
  get selected() {
    return tagStore.isSelected(this.props.tag)
  }

  get className() {
    let className = `tag ${this.props.className}`
    if (this.selected) className += ` selected`
    return className
  }

  render() {
    return (
      <span className={this.className} onClick={this.handleClick}>
        {this.props.tag}
      </span>
    )
  }
}
export default decorate(
  styled`
    border-radius: 3px;
    color: #999;
    background-color: #f5f5f5;
    font-size: 10px;
    letter-spacing: .5px;
    padding: 3px 4px 2px;
    border: 1px solid #f5f5f5;
    text-transform: uppercase;
    margin: 0 3px 3px 0;
    cursor: pointer;
    display: inline-block;

    &:hover {
      background-color: #e3eff3;
      border-bottom: 0;
    }

    &.selected {
      background: ${t(`primary`)};
      color: white;
    }
  `,
  observer,
  Tag,
)

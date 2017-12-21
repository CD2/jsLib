import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { styled, t } from "lib/utils/theme"
import decorate from 'lib/utils/decorate'

export class Accordian extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    headerContent: PropTypes.node,
    noAnimation: PropTypes.bool,
    open: PropTypes.bool,
    rowHeight: PropTypes.number,
    rows: PropTypes.array,
    showHeaderDivider: PropTypes.bool,
    toggle: PropTypes.func,
  }

  static defaultProps = {
    headerContent: null,
    rows: [],
    showHeaderDivider: false,
    open: null,
    rowHeight: 50,
    toggle: null,
    noAnimation: false,
  }

  @action componentWillReceiveProps = (nextProps) => {
    if(nextProps.open !== this.props.open && nextProps.open !== this.open) {
      this.open = nextProps.open
    }
  }

  @observable open = !!this.props.open

  @action handleToggle = () => {
    if(this.props.open === null) {
      this.open = !this.open
    } else if(this.props.toggle) {
      this.props.toggle()
    }
  }

  renderRow = (row, i) => {
    return(
      <div
        className="accordian__row"
        key={`accordianRow${i}`}
        style={this.props.noAnimation ? {} : { minHeight: `${this.props.rowHeight  }px` }}
      >
        {row}
      </div>
    )
  }

  renderRows = () => {
    return this.props.rows.map(this.renderRow)
  }

  renderHeader = () => {
    return(
      <div
        className={
          this.props.showHeaderDivider
            ? `accordian__row accordian__row--header accordian__row--with-divider`
            : `accordian__row accordian__row--header`
        }
        onClick={this.handleToggle}
      >
        { this.props.headerContent }
      </div>
    )
  }

  getStyle = () => {
    if (this.props.noAnimation) {
      return {}
    }

    return this.open ?
      { minHeight: `${this.props.rows.length * this.props.rowHeight  }px` } :
      { minHeight: `0px` }
  }

  getClassName = () => {
    if (this.props.noAnimation) {
      return this.open ? `accordian__content-noAnimation accordian__content-noAnimation--open`
        : `accordian__content-noAnimation`
    }

    return this.open ? `accordian__content accordian__content--open` : `accordian__content`
  }

  render() {
    return(
      <div className={this.props.className ? `${this.props.className } accordian` : `accordian`}>
        {this.props.headerContent ? this.renderHeader() : null}
        <div
          style={this.getStyle()}
          className={this.getClassName()}
        >
          {this.renderRows()}
        </div>
      </div>
    )
  }

}

export default decorate(
  styled`
  .accordian {
    display: flex;
    background-color: white;
    font-size: .8rem;
    color: ${t(`font`)};
  }

  .accordian__content-noAnimation {
    display: none;

    &--open {
      display: block;
      width: 100%;
    }
  }

  .accordian__content {
    display: flex;
    overflow: hidden;
    transition: all 0.2s ease;
    height: 0;
    opacity: 0;
    pointer-events: none;
    width: 100%;

    &--open {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .accordian__row {

    &--header {
      font-weight: 600;
    }

    &--with-divider {
      border-bottom: ${t(`border`)} 1px solid;
    }
  }
  `,
  observer,
  Accordian,
)

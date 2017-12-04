import React from 'react'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'

import decorate from 'lib/utils/decorate'
import { styled, t } from 'lib/utils/theme'

export class SlidingView extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    views: PropTypes.array.isRequired,
  }

  static defaultProps = {
    containerClassName: ``,
  }

  componentDidMount() {
    this.updateViewWidth()
    window.addEventListener(`resize`, debounce(this.updateViewWidth))
  }

  @action updateViewWidth = () => {
    this.clientWidth = this.view.clientWidth
  }

  @observable position = 0
  @observable clientWidth = 0

  @action handleNavClick = index => this.position = index

  @computed get viewStyle() {
    return {
      width: `${this.props.views.length * 100}%`,
      left: `-${this.position * (this.view ? this.clientWidth : 0)}px`
    }
  }

  renderNavButtons = () => this.props.views.map((view, index) => (
    <div
      key={index}
      className={`sliding-view__nav-button ${index === this.position ? `sliding-view__nav-button--selected` : ``}`}
      onClick={() => this.handleNavClick(index)}
    >
      {view.name}
    </div>
  ))

  renderSlides = () => this.props.views.map((view, index) => (
    <div key={index} className="sliding-view__slide">
      {view.content}
    </div>
  ))

  render = () => (
    <div className={`${this.props.className} ${this.props.containerClassName}`}>
      <div className="sliding-view__nav-buttons">
        {this.renderNavButtons()}
      </div>
      <div className="sliding-view__view" ref={element => this.view = element}>
        <div
          className="sliding-view__slider"
          style={this.viewStyle}
        >
          {this.renderSlides()}
        </div>
      </div>
    </div>
  )

}

export default decorate(
  styled`
    display: flex;
    flex-direction: column;

    .sliding-view__nav-buttons {
      display: flex;
      background-color: white;
      width: 100%;
    }

    .sliding-view__nav-button {
      background-color: white;
      color: ${t(`font`)};
      display: flex;
      flex: 1;
      padding: 20px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 1.2rem;
      transition: background-color 0.5s, color 0.1s;

      &:hover, &--selected {
        background-color: ${t(`primary`)};
        color: white;
      }

    }

    .sliding-view__view {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .sliding-view__slider {
      display: flex;
      flex-direction: row;
      position: relative;
      transition: left 0.5s;
      top: 0;
      bottom: 0;
    }

    .sliding-view__slide {
      width: 100%;
    }
  `,
  observer,
  SlidingView
)

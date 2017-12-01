import React from 'react'
import PropTypes from 'prop-types'

import { styled, t } from 'lib/utils/theme'
import decorate from 'lib/utils/decorate'

export class LoadingBars extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className="sk-wave">
          <div className="sk-rect sk-rect1" />
          <div className="sk-rect sk-rect2" />
          <div className="sk-rect sk-rect3" />
          <div className="sk-rect sk-rect4" />
          <div className="sk-rect sk-rect5" />
        </div>
      </div>
    )
  }

}
export default decorate(
  styled`
    background: #fff;
    height: 100%;
    padding: 10px;
  .sk-wave {
    margin: 40px auto;
    width: 50px;
    height: 40px;
    text-align: center;
    font-size: 10px; }
    .sk-wave .sk-rect {
      background-color: ${t(`border`)};
      margin: 0 1px;
      height: 100%;
      width: 6px;
      display: inline-block;
      -webkit-animation: sk-waveStretchDelay 1.2s infinite ease-in-out;
              animation: sk-waveStretchDelay 1.2s infinite ease-in-out; }
    .sk-wave .sk-rect1 {
      -webkit-animation-delay: -1.2s;
              animation-delay: -1.2s; }
    .sk-wave .sk-rect2 {
      -webkit-animation-delay: -1.1s;
              animation-delay: -1.1s; }
    .sk-wave .sk-rect3 {
      -webkit-animation-delay: -1s;
              animation-delay: -1s; }
    .sk-wave .sk-rect4 {
      -webkit-animation-delay: -0.9s;
              animation-delay: -0.9s; }
    .sk-wave .sk-rect5 {
      -webkit-animation-delay: -0.8s;
              animation-delay: -0.8s; }

  @-webkit-keyframes sk-waveStretchDelay {
    0%, 40%, 100% {
      -webkit-transform: scaleY(0.4);
              transform: scaleY(0.4); }
    20% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1); } }

  @keyframes sk-waveStretchDelay {
    0%, 40%, 100% {
      -webkit-transform: scaleY(0.4);
              transform: scaleY(0.4); }
    20% {
      -webkit-transform: scaleY(1);
              transform: scaleY(1); } }

  `,
  LoadingBars
)

import React from "react"
import PropTypes from "prop-types"
import { styled, t } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
export class LoadingSpinner extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: null,
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className={`loading-spinner__spinner`} />
      </div>
    )
  }
}
export default decorate(
  styled`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 90%;
    &.full-screen {
      height: 80vh;
    }

    @keyframes loadingSpinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    .loading-spinner__spinner {
      font-size: 10px;
      margin: 50px auto;
      text-indent: -9999em;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      background: ${t(`primary`)};
      background: linear-gradient(to right, ${t(`primary`)} 10%, rgba(255, 255, 255, 0) 42%);
      position: relative;
      animation: loadingSpinner 1.4s infinite linear;
      transform: translateZ(0);

      &:before {
        width: 50%;
        height: 50%;
        background: ${t(`primary`)};
        border-radius: 100% 0 0 0;
        position: absolute;
        top: 0;
        left: 0;
        content: '';
      }

      &:after {
        background: ${t(`background`)};
        width: 95%;
        height: 95%;
        border-radius: 50%;
        content: '';
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
  `,
  LoadingSpinner,
)

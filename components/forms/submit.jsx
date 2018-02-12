import React from "react"
import PropTypes from "prop-types"
import { styled, t } from "lib/utils/theme"
import load from "images/load"

@styled`
    position: relative;
    display: inline-block;
    padding: ${t(`buttonPadding`)};
    border: none;
    outline: none;
    font-size: ${t(`fontSizes.button`)};
    line-height: 1.25;
    text-decoration: none;
    cursor: pointer;
    vertical-align: top;
    color: white;
    border-radius: ${t(`borderRadii.button`)};
    text-align: center;
    font-weight: ${t(`weights.button`)};
    background: linear-gradient(to bottom,  ${t(`primary`)} 0%,${t(
  `primaryLight`,
)} 100%);
    border: 1px solid ${t(`positive`)};
    &:hover {
      background-color: ${t(`primaryLight`)};
    }
    ${({ submitting }) => {
      if (submitting) {
        return `
        background: url(${load});
        opacity: 0.7;
        background-size: 100%;
        background-repeat: no-repeat;
        background-color: #2c2d2d;
        background-position: 50%;
        &:hover{
          background-color: #2c2d2d;
        }
    `
      }
    }}
          &.gradient-positive {
        background: linear-gradient(to bottom,  #39b449 0%,#299a0b 100%);
        border: 1px solid ${t(`positive`)};

      }
      &.gradient-neutral {
        background: linear-gradient(to bottom,  #f6fcfd 0%,#eff3f6 100%);
        color: ${t(`lightText`)};
        border: 1px solid ${t(`border`)};
        &:hover {
          filter: brightness(1.02);
        }
      }

`
export default class Submit extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    submitting: PropTypes.bool,
    value: PropTypes.string,
  }

  static defaultProps = {
    submitting: false,
  }

  render() {
    const { className = ``, value, submitting, buttonStyle } = this.props
    let val = value
    if (submitting) {
      val = ``
    } else {
      val = val || `Submit`
    }

    return (
      <input
        className={`btn ${className} ${buttonStyle}`}
        type="submit"
        value={val}
      />
    )
  }
}

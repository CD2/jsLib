import React from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import { Link } from 'react-router-dom'

import { styled, t } from 'lib/utils/theme'
import decorate from 'lib/utils/decorate'
import load from 'images/load'

export class Button extends React.Component {

  static propTypes = {
    buttonStyle: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    external: PropTypes.bool,
    onClick: PropTypes.func,
    processing: PropTypes.bool,
    target: PropTypes.string,
    to: PropTypes.string,
  }

  static defaultProps = {
    buttonStyle: `common`,
    external: false,
    processing: false,
  }

  getChildren = () => {
    const { processing, children } = this.props
    if (processing) {
      return null
    }

    return children
  }

  render() {
    let { className, to, external, buttonStyle, onClick, children, target, processing } = this.props

    invariant(!(external && !to), `prop \`to\` is required if \`external\` is present`)

    let Comp = `div`
    className = `${className} ${buttonStyle} btn`

    let props = { className, to, onClick, children, target }

    if (to) {
      if (external) {
        Comp = `a`
        props.href = props.to
        delete props.to
      } else {
        Comp = Link
      }
    }

    const processingProp = processing ? { onClick: () => null } : {}

    return (
      <Comp {...{ ...props, ...processingProp }}>{this.getChildren()}</Comp>
    )
  }

}
export default decorate(
  styled`
    &.btn {
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

      &.common {
        background-color: ${t(`primary`)};
        &:hover {
          color: white;
        }
      }

      &.download {
        font-size: 0.9em;
      }

      &.more_link {
        background-color: ${t(`darkBackground`)};
        &:hover {
          color: white;
        }
      }

      &.feature {
        background-color: ${t(`secondary`)};
        padding: 13px 25px 15px;
        &:hover {
          color: white;
        }
      }

      &.small {
        font-size: 0.9rem;
        font-weight: 600;
        padding: 6px 14px 7px;
        background-color: ${t(`primary`)};
        &:hover {
          color: white;
        }
      }

      &.secondary {
        background-color: #fff;
        color: ${t(`primary`)};
        border: 2px solid ${t(`primary`)};
        padding: 8px 18px 10px;
        &:hover {
          color: ${t(`primary`)};
        }
      }

      &.dark {
        color: ${t(`white`)};
        border: 2px solid ${t(`white`)};
      }
      &.dark-solid {
        border: 2px solid ${t(`white`)};
        background: white;
      }

      &:hover {
        filter: brightness(1.15);
      }

      &.minor {
        background-color: ${t(`background`)};
        color: ${t(`lightText`)};
        font-size: 0.9rem;
        padding: 6px 14px 7px;
        &:hover {
          background-color: #cecece;
        }
      }
      
      &.minor-active {
        background-color: ${t('primary')};
        color: ${t(`white`)};
        font-size: 0.9rem;
        padding: 6px 14px 7px;
      }

      &.cancel {
        background-color: ${t(`background`)};
        color: ${t(`lightText`)};
        &:hover {
          background-color: #cecece;
        }
      }

      &.delete {
        background-color: ${t(`error`)};
        color: ${t(`white`)};
        &:hover {
          background-color: #cecece;
        }
      }

      &.pagination {
        background-color: ${t(`primary`)};
        font-size: 0.9em;
        font-weight: 600;
        padding: 6px 14px 7px;
        margin: 3px 1px;
        border-radius: 2px;
        &:hover {
          color: white;
        }
      }
      &.teaser {
        background-color: ${t(`primary`)};
        margin-top: 16px;
        &:hover {
          color: white;
        }
      }
      &.action {
        font-size: 1.2em;
        color: ${t(`primary`)};
        font-weight: 600;
        border: 2px solid ${t(`primary`)};
      }
      &.table {
        margin: 0;
        background-color: ${t(`primary`)};
        font-size: 1em;
        font-weight: 600;
        padding: 10px 30px;
        border-radius: 3px;
            &:hover {
          color: white;
        }
      }
      &.field {
        font-size: 0.9rem;
        font-weight: 600;
        padding: 6px 14px 7px;
        margin-bottom: 12px;
        background-color: ${t(`primary`)};
        &:hover {
          color: white;
        }
      }
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
      &.menu {
        border-radius: 0;
        color: ${t(`text`)};
        display: block;
        text-align: left;
        font-weight: normal;
        margin-right: 0;
        &:hover { 
          background: #cccccc;
        }
      }

    }
    margin-right: 6px;

    ${({ processing }) => {
      if (processing){
        return`
        cursor: none;
        background: url(${load});
        opacity: 0.7;
        background-size: 100%;
        background-repeat: no-repeat;
        background-color: #2c2d2d;
        background-position: 50%;
        min-height: 2.2rem;
        min-width: 3rem;
        pointer-events: none;
        &:hover{
          background-color: #2c2d2d;
        }
      `}
    }
}
  `,
  Button
)

import React from 'react'
import PropTypes from 'prop-types'
import invariant from 'invariant'
import { Link } from 'react-router-dom'
import { styled, t } from 'utils/theme'
import decorate from 'utils/decorate'

export class Button extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    to: PropTypes.string,
    external: PropTypes.bool,
    buttonStyle:  PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.node,
    target: PropTypes.string,
  }

  static defaultProps = {
    buttonStyle: 'common',
    external: false,
  }

  render() {
    let { className, to, external, buttonStyle, onClick, children, target } = this.props

    invariant(!(external && !to), 'prop `to` is required if `external` is present')

    let Comp = 'div'
    className = `${className} ${buttonStyle} btn`

    let props = { className, to, onClick, children, target }

    if (to) {
      if (external) {
        Comp = 'a'
        props.href = props.to
        delete props.to
      } else {
        Comp = Link
      }
    }
    return (
      <Comp {...props}>{children}</Comp>
    )
  }

}
export default decorate(
  styled`
    &.btn {
      position: relative;
      display: inline-block;
      padding: 10px 20px 12px;
      border: none;
      outline: none;
      font-size: 1rem;
      line-height: 1.25;
      text-decoration: none;
      cursor: pointer;
      vertical-align: top;
      color: white;
      border-radius: 5px;

      &.common {
        background-color: ${t('primary')};
        &:hover {
          color: white;
        }
      }

      &.small {
        font-size: 0.9rem;
        font-weight: 600;
        padding: 6px 14px 7px;
        background-color: ${t('primary')};
        &:hover {
          color: white;
        }
      }

      &.secondary {
        background-color: #fff;
        color: ${t('primary')};
        border: 2px solid ${t('primary')};
        &:hover {
          color: ${t('primary')};
        }
      }

      &.dark {
        color: ${t('white')};
        border: 2px solid ${t('white')};
      }

      &:hover {
        filter: brightness(1.15);
      }
      
      &.minor {
        background-color: ${t('background')};
        color: ${t('lightText')};
        font-size: 0.9rem;
        padding: 6px 14px 7px;
        &:hover {
          background-color: #cecece;
        }
      }
      
      &.cancel {
        background-color: ${t('background')};
        color: ${t('lightText')};
        &:hover {
          background-color: #cecece;
        }
      }

    }
    + .btn {
      margin-left: 10px;
    }
  `,
  Button
)

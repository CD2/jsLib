import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { styled, t } from 'utils/theme'

@styled`
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

    }
    + .btn {
      margin-left: 10px;
    }
`
export default class Button extends React.Component {

  static PropTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    buttonStyle:  PropTypes.string,
    target:  PropTypes.string,
  }

  static defaultProps = {
    buttonStyle: 'common',
  }

  render() {
    const { className, text, to, buttonStyle, onClick, target } = this.props
    if(to) {
      return (
        <Link to={to} target={target} onClick={onClick} className={`${className} ${buttonStyle} btn`}>
          {text}
        </Link>
      )
    } else {
      return (
        <a onClick={onClick} target={target} className={`${className} ${buttonStyle} btn`}>
          {text}
        </a>
      )
    }
  }

}

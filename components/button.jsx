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
      }
      
      &.secondary {
        color: ${t('primary')};
        border: 2px solid ${t('primary')};
        
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
    style:  PropTypes.string,
  }

  static defaultProps = {
    style: 'common',
  }

  render() {
    const { className, text, to, style } = this.props

    return (
      <Link to={to} className={`${className} ${style} btn`}>
        {text}
      </Link>
    )
  }

}

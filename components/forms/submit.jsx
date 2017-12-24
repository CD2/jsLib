import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'lib/utils/theme'
import load from 'images/load'

@styled`
    position: relative;
    display: inline-block;
    padding: 12px 40px 14px;
    border: none;
    outline: none;
    font-size: 1rem;
    line-height: 1.25;
    text-decoration: none;
    cursor: pointer;
    vertical-align: top;
    color: white;
    border-radius: 5px;
    background-color: ${t(`primary`)};
    transition: 0.3s;
    margin-bottom: 10px;
    &:hover {
      background-color: ${t(`primaryLight`)};
    }
    ${({ submitting }) => {
  if (submitting){
    return`
            background: url(${load});
            opacity: 0.7;
            background-size: 100%;
            background-repeat: no-repeat;
            background-color: #2c2d2d;
            background-position: 50%;
            &:hover{
              background-color: #2c2d2d;
            }
    `}
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
    submitting: false
  }

  render() {
    const { className=``, value, submitting } = this.props
    let val = value
    if (submitting) {
      val = ``
    } else {
      val = val || `Submit`
    }

    return (
      <input className={`btn ${className}`} type="submit" value={val} />
    )
  }

}

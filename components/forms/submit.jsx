import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

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
    background-color: ${t('primary')};
    transition: 0.3s;
    margin-bottom: 10px;
    &:hover {
      background-color: ${t('primaryLight')};
    }
`
export default class Submit extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
  }

  render() {
    const { className='', value } = this.props
    return (
      <input className={`btn ${className}`} type='submit' value={value} />
    )
  }

}

import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

@styled`
  position: relative;
  display: inline-block;
  padding: 10px 28px 10px;
  border: none;
  outline: none;
  box-shadow: 0 2px 0 #003618;
  font-size: 1rem;
  line-height: 1.25;
  text-decoration: none;
  cursor: pointer;
  vertical-align: top;
  color: white;
  background-color: ${t('primary')};
  margin-bottom: 6px
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

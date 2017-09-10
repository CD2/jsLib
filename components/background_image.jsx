import React from 'react'
import PropTypes from 'prop-types'
import { styled, p } from 'utils/theme'

@styled`
  width: ${p('width', '100%')};
  height: ${p('height', '100%')};
  ${({ src, default_src, contain }) => {
    const image = src || default_src
    const backgroundSize = contain ? 'contain' : 'cover'
    if (image) {
        return `
          background-image: url(${image});
          background-size: ${backgroundSize};
          background-position: 50%;
          background-repeat: no-repeat;
        `
      } else {
        return `background-color: #ddd;`
    }
  }

  }
`
export default class BackgroundImage extends React.Component {

  static PropTypes = {
    src: PropTypes.string,
    default_src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    contain: PropTypes.bool,
  }

  render() {
    const { className, children } = this.props

    return (
      <div className={className}>
        { children }
      </div>
    )
  }

}

import React from 'react'
import PropTypes from 'prop-types'
import { styled, p } from 'utils/theme'
import decorate from 'utils/decorate'

export class BackgroundImage extends React.Component {

  static PropTypes = {
    src: PropTypes.string,
    default_src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    contain: PropTypes.bool,
    circular: PropTypes.bool,
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
export default decorate(
  styled`
    width: ${p('width', '100%')};
    height: ${p('height', '100%')};
    ${props => props.circular ? `border-radius: 50%;` : ``}
    ${({ src, default_src, contain }) => {
      const image = src || default_src
      const backgroundSize = contain ? 'contain' : 'cover'
      if (image) {
          return `
            background-size: ${backgroundSize};
            background-image: url(${image});
            background-position: 50%;
            background-repeat: no-repeat;
          `
        } else {
          return `background-color: #ddd;`
      }
    }

    }
  `,
  BackgroundImage
)

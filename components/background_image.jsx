import React from 'react'
import PropTypes from 'prop-types'
import { styled, p } from 'utils/theme'
import decorate from 'utils/decorate'
import { apiRoute } from 'utils/api_http'

export class BackgroundImage extends React.Component {

  static propTypes = {
    circular: PropTypes.bool,
    contain: PropTypes.bool,
    default_src: PropTypes.string,
    height: PropTypes.string,
    src: PropTypes.string,
    url: PropTypes.string,
    width: PropTypes.string,
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
    width: ${p(`width`, `100%`)};
    height: ${p(`height`, `100%`)};
    ${props => props.circular ? `border-radius: 50%;` : ``}
    ${({ src, default_src, contain, url }) => {
    const image = url ? apiRoute + url : src || default_src
    const backgroundSize = contain ? `contain` : `cover`
    if (image) {
      return `
            background-size: ${backgroundSize};
            background-image: url(${image});
            background-position: 50%;
            background-repeat: no-repeat;
      `
    }
    return `background-color: #ddd;`
  }

}
  `,
  BackgroundImage
)

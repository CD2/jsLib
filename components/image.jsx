import React from 'react'
import PropTypes from 'prop-types'
import { buildUrl } from 'utils/api_http'
import invariant from 'invariant'
import { styled } from 'utils/theme'
import decorate from 'utils/decorate'

export class Image extends React.Component {

  static propTypes = {
    alt: PropTypes.string,
    background: PropTypes.bool,
    children: PropTypes.node,
    circular: PropTypes.bool,
    className: PropTypes.string,
    crop: PropTypes.bool,
    defaultSrc: PropTypes.string,
    height: PropTypes.number,
    onClick: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
    uid: PropTypes.string,
    width: PropTypes.number,
  }

  static defaultProps = {
    crop: false,
    background: false,
    alt: ``,
  }

  get url() {
    const { uid, width, height, crop, size } = this.props
    const params = { uid, size }
    if (height && !size) params.size = `${Math.round(height*1.5*2)}x${height*2}`
    if (width && !size) params.size = `${width*2}x${Math.round(width/1.5*2)}`
    if (width && height && !size) params.size = `${width*2}x${height*2}`
    if (crop) params.crop = true
    return buildUrl([`/image`], params)
  }

  render() {
    const { alt, background, children, defaultSrc, uid } = this.props

    invariant(!(background && alt), `background images don't accept alt tags`)

    let url = this.url
    if (!uid) { url = defaultSrc }

    if (background) {
      return (
        <div
          style={
            Object.assign({ backgroundImage: `url(${url})` }, this.props.style)
          }
          children={children}
          className={`background-image ${this.props.className}`}
          onClick={this.props.onClick}
        />
      )
    }

    invariant(!children, `images cant accept children unless marked as a background image`)

    return (
      <img
        alt={alt}
        src={url}
        className={`image ${this.props.className}`}
        style={this.props.style}
        onClick={this.props.onClick}
      />
    )
  }

}
export default decorate(
  styled`
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
    position: relative;

    ${({ circular }) => {
    if (circular) {
      return `border-radius: 50%;
      `
    }
  }}
    ${({ height }) => {
    if (height) {
      return `height: ${height}px;`
    }
  }}
    ${({ width }) => {
    if (width) {
      return `width: ${width}px;`
    }
  }}

  `,
  Image
)

import React from "react"
import PropTypes from "prop-types"
import { buildUrl } from "lib/utils/api_http"
import invariant from "invariant"
import { styled } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
import App from 'models/App'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer
export class Image extends React.Component {
  static propTypes = {
    alt: PropTypes.string,
    background: PropTypes.bool,
    children: PropTypes.node,
    circular: PropTypes.bool,
    className: PropTypes.string,
    contain: PropTypes.bool,
    crop: PropTypes.bool,
    defaultSrc: PropTypes.string,
    embed: PropTypes.bool,
    height: PropTypes.number,
    onClick: PropTypes.func,
    size: PropTypes.string,
    style: PropTypes.object,
    uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    url: PropTypes.string,
    width: PropTypes.number,
  }

  static defaultProps = {
    crop: false,
    background: false,
    alt: ``,
    embed: false,
    url: null,
  }

  componentDidMount(){
    this.fetchUrl()
  }

  async fetchUrl() {
    const { uid, url, width, height, crop, size } = this.props
    if (url) return url
    const params = { uid, size }
    if (height && !size) {
      params.size = `${Math.round(height * 1.5 * 2)}x${height * 2}`
    }
    if (width && !size) {
      params.size = `${width * 2}x${Math.round(width / 1.5 * 2)}`
    }
    if (width && height && !size) params.size = `${width * 2}x${height * 2}`
    if (crop) params.crop = true
    // return buildUrl([`/image`], params)
    App.image(params).then(response=>
      this.url = response.data.url
    )
  }

  @observable url

  render() {
    const { alt, background, children, defaultSrc, uid, embed, width, height } = this.props

    invariant(!(background && alt), `background images don't accept alt tags`)
    if(!this.url) return ''
    let url = this.url

    if (!uid && !this.props.url) {
      url = defaultSrc
    }
    if (embed) {
      return (
        <embed
          width={`${width}px`}
          height={`${height}px`}
          style={this.props.style}
          className={`image ${this.props.className}`}
          src={url}
          onClick={this.props.onClick}
        />
      )
    }

    if (background) {
      return (
        <div
          style={Object.assign({ backgroundImage: `url(${url})` }, this.props.style)}
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
    display: block;
    ${({ contain }) => {
    if (contain) {
      return `background-size: contain;
      `
    }
  }}
      max-width: 100%;
    max-height: 100%;

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
  Image,
)

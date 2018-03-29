import React from "react"
import PropTypes from "prop-types"
import theme from "styles/theme"
import { observer } from "mobx-react"
import decorate from "lib/utils/decorate"
import Image from "./image"

export class Wrapper extends React.Component {
  static propTypes = {
    background: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundImageSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    backgroundImageUid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    border: PropTypes.string,
    borderRadius: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    extraContentStyle: PropTypes.object,
    floating: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    fullHeight: PropTypes.bool,
    gutter: PropTypes.number,
    innerBackground: PropTypes.string,
    margin: PropTypes.number,
    noGutters: PropTypes.bool,
    noMargin: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    noRelative: PropTypes.bool,
    noShadow: PropTypes.bool,
    noSpacing: PropTypes.bool,
    onClick: PropTypes.func,
    overflow: PropTypes.bool,
    overlay: PropTypes.string,
    spacing: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.object,
    theme: PropTypes.object,
    wide: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }

  renderContent() {
    const { children, noGutters, spacing, noSpacing, noRelative, extraContentStyle } = this.props
    const width = this.props.width || theme.siteWidth
    const gutters = noGutters ? 0 : this.props.gutter || theme.gutterWidth
    const spacingHeight = noSpacing ? 0 : spacing ? spacing : theme.gutterHeight

    const defaultContentStyle = {
      width: `100%`,
      position: noRelative ? `static` : `relative`,
      margin: `0 auto`,
      padding: `${spacingHeight}px ${gutters}px`,
      maxWidth: typeof width === `string` ? width : `${width}px`,
    }

    const contentStyle = Object.assign(defaultContentStyle, extraContentStyle)

    return <div style={contentStyle}>{children}</div>
  }

  renderOverlay() {
    const { overlay } = this.props

    const overlayStyle = {
      position: `absolute`,
      width: `100%`,
      height: `100%`,
      left: `0`,
      top: `0`,
      backgroundAttachment: `fixed`,
      opacity: `0.93`,
      backgroundColor: overlay || `black`,
    }

    if (overlay) return <div style={overlayStyle} />
  }

  render() {
    const {
      backgroundImageUid,
      backgroundImage,
      background,
      floating,
      noRelative,
      noMargin,
    } = this.props
    if (backgroundImageUid || backgroundImage) {
      return (
        <Image
          className={this.props.className || ``}
          uid={backgroundImageUid}
          defaultSrc={backgroundImage}
          style={{
            ...{
              position: `relative`,
              boxShadow: floating ? theme.shadow0 : `none`,
              borderRadius: floating ? `6px` : `0`,
              marginBottom:
                floating && !noMargin ? this.props.margin || theme.gutterHeight.value : `0`,
              overflow: this.props.overflow ? `initial` : `hidden`,
              height: this.props.fullHeight ? `100%` : `auto`,
            },
            ...this.props.style,
          }}
          size={this.props.backgroundImageSize ? this.props.backgroundImageSize : null}
          background
        >
          {this.renderOverlay()}
          {this.renderContent()}
        </Image>
      )
    }
    return (
      <div
        className={this.props.className || ``}
        style={{
          ...{
            backgroundColor: background || `white`,
            position: noRelative ? `static` : `relative`,
            boxShadow: !this.props.noShadow && floating ? theme.shadow0 : `none`,
            borderRadius: floating || this.props.borderRadius ? `6px` : `0`,
            marginBottom:
              floating && !noMargin ? this.props.margin || theme.gutterHeight.value : `0`,
            overflow: this.props.overflow ? `initial` : `hidden`,
            height: this.props.fullHeight ? `100%` : `auto`,
            border: this.props.border,
          },
          ...this.props.style,
        }}
        onClick={this.props.onClick}
      >
        {this.renderOverlay()}
        {this.renderContent()}
      </div>
    )
  }
}
export default decorate(observer, Wrapper)

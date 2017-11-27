import React from 'react'
import PropTypes from 'prop-types'
import theme from 'styles/theme'
import { observer } from 'mobx-react'
import decorate from 'lib/utils/decorate'
import Image from "./image"

export class Wrapper extends React.Component {

  static propTypes = {
    background: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundImageUid: PropTypes.string,
    borderRadius: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    floating: PropTypes.bool,
    gutter: PropTypes.number,
    innerBackground: PropTypes.string,
    noGutters: PropTypes.bool,
    overflow: PropTypes.bool,
    overlay: PropTypes.string,
    spacing: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    theme: PropTypes.object,
    wide: PropTypes.bool,
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
  }


  renderContent(){
    const { children, noGutters, spacing, noSpacing } = this.props
    const width = this.props.width || theme.siteWidth
    const gutters = noGutters ? 0 : this.props.gutter || theme.gutterWidth
    const spacingHeight = noSpacing ? 0 : spacing ? spacing : theme.gutterHeight

    const contentStyle = {
      width: `100%`,
      position: `relative`,
      margin: `0 auto`,
      padding: `${spacingHeight}px ${gutters}px`,
      maxWidth: typeof width === `string` ? width : `${width}px`,
    }

    return (
      <div style={contentStyle}>
        {children}
      </div>
    )
  }

  renderOverlay(){
    const { overlay } = this.props

    const overlayStyle = {
      position: `absolute`,
      width: `100%`,
      height: `100%`,
      left: `0`,
      top: `0`,
      backgroundAttachment: `fixed`,
      opacity: `0.93`,
      backgroundColor: overlay || `black`
    }

    if (overlay) return <div style={overlayStyle} />
  }

  render() {
    const { backgroundImageUid, backgroundImage, background, floating } = this.props

    if (backgroundImageUid || backgroundImage){
      return (
        <Image
          className={this.props.className || ``}
          uid={backgroundImageUid}
          defaultSrc={backgroundImage}
          style={{
            position: `relative`,
            boxShadow: floating ? theme.shadow0 : `none`,
            borderRadius: floating ? `6px` : `0`,
            marginBottom: floating ? theme.gutterHeight.value : `0`,
            overflow: `hidden`,
          }}

          background
        >
          { this.renderOverlay() }
          { this.renderContent() }
        </Image>
      )
    }
    return (
      <div
        className={this.props.className || ``}
        style={{
          backgroundColor: background || `white`,
          position: `relative`,
          boxShadow: floating ? theme.shadow0 : `none`,
          borderRadius: floating || this.props.borderRadius ? `6px` : `0`,
          marginBottom: floating ? theme.gutterHeight.value : `0`,
          overflow: this.props.overflow ? `initial` : `hidden`,
        }}
      >
        { this.renderOverlay() }
        { this.renderContent() }
      </div>
    )
  }

}
export default decorate(
  observer,
  Wrapper
)

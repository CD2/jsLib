import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'utils/theme'
import { p } from 'utils/theme'
import { observer } from 'mobx-react'
import decorate from 'utils/decorate'
import Image from "./image"

export class Wrapper extends React.Component {

  static propTypes = {
    background: PropTypes.string,
    backgroundImage: PropTypes.string,
    backgroundImageUid: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
    gutter: PropTypes.number,
    innerBackground: PropTypes.string,
    noGutters: PropTypes.bool,
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
    const { children } = this.props
    const width = this.props.width || this.props.theme.siteWidth
    return (
      <div
        className="wrapper__inner"
        style={{ maxWidth: typeof width === `string` ? width : `${width}px` }}
      >
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
      opacity: `0.8`,
      backgroundColor: overlay || `black`
    }

    if(overlay) return <div style={overlayStyle} />
  }

  render() {
    const { className, backgroundImageUid, backgroundImage, background } = this.props

    if(backgroundImageUid || backgroundImage){
      return(
        <Image
          className={className}
          uid={backgroundImageUid}
          defaultSrc={backgroundImage}
          background
        >
          { this.renderOverlay() }
          { this.renderContent() }
        </Image>
      )
    }
    return (
      <div className={className} style={{ backgroundColor: background || `white` }}>
        { this.renderOverlay() }
        { this.renderContent() }
      </div>
    )
  }

}
export default decorate(
  styled`
    position: relative;
    > .wrapper__inner {
      width: 100%;
      position: relative;
  ${({ innerBackground: bg }) => bg ? `background-color: ${bg};` : ``};
      margin: 0 auto;
  ${({ spacing, theme, noGutters, gutter }) => {
    if(!noGutters) {
      return `padding: ${
        (theme.spacing[spacing] || spacing || theme.spacing.small)}px ${gutter || theme.gutterWidth
      }px;`
    }
  }
}
  `,
  observer,
  Wrapper
)

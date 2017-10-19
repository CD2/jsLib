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
    backgroundSize: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    gutter: PropTypes.number,
    innerBackground: PropTypes.string,
    overlay: PropTypes.string,
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    theme: PropTypes.shape({
      siteWidth: PropTypes.any
    }),
    wide: PropTypes.bool,
    width: PropTypes.number,

  }

  render() {
    const {
      className, children, overlay, backgroundImage,
      backgroundImageUid, backgroundSize
    } = this.props
    const width = this.props.width || this.props.theme.siteWidth
    if(backgroundImage || backgroundImageUid) {
      return(
        <Image
          className={className}
          defaultSrc={backgroundImage}
          uid={backgroundImageUid}
          size={backgroundSize}
          crop
          background
        >
          {overlay && <div className="wrapper__overlay" />}
          <div className="wrapper__inner" style={{ maxWidth: `${width}px` }}>
            {children}
          </div>
        </Image>
      )
    }
    return (
      <div className={className}>
        {overlay && <div className="wrapper__overlay" />}
        <div className="wrapper__inner" style={{ maxWidth: `${width}px` }}>
          {children}
        </div>
      </div>
    )
  }

}
export default decorate(
  styled`
   .wrapper__overlay {
      background-color: ${p(`overlay`, `#000`)};
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-attachment: fixed;
      opacity: 0.8;
    }

    background-color: ${({ background, theme }) => background || theme.background};
  }}

    position: relative;
    > .wrapper__inner {
      width: 100%;
      position: relative;
      z-index: 1001;
      ${({ innerBackground: bg }) => bg ? `background-color: ${bg};` : ``};
      margin: 0 auto;
      ${({ spacing, theme, gutter }) => {
    return `padding: ${(theme.spacing[spacing]
        || spacing || theme.spacing.small)}px ${gutter || theme.gutterWidth}px;`
  }
}
  `,
  observer,
  Wrapper
)

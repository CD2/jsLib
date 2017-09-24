import React from 'react'
import PropTypes from 'prop-types'
import { styled } from 'utils/theme'
import { p } from 'utils/theme'
import { observer } from 'mobx-react'
import decorate from 'utils/decorate'

export class Wrapper extends React.Component {

  static propTypes = {
    width: PropTypes.number,
    background: PropTypes.string,
    innerBackground: PropTypes.string,
    backgroundImage: PropTypes.string,
    overlay: PropTypes.string,
    spacing: PropTypes.number,
    gutter: PropTypes.number,
    wide: PropTypes.bool,
  }

  render() {
    const { className, children, overlay } = this.props
    const width = this.props.width || this.props.theme.siteWidth
    return (
      <div className={className}>
        { overlay && <div className="wrapper__overlay" /> }
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

    ${({ backgroundImage }) => {
    if (backgroundImage) {
      return `
              background-image: url(${backgroundImage});
              background-size: cover;
              background-position: 50%;
              background-repeat: no-repeat;
      `
    }
  }}

    position: relative;
    > .wrapper__inner {
      width: 100%;
      position: relative;
      z-index: 1001;
      ${({ innerBackground: bg }) => bg ? `background-color: ${bg};` : ``};
      margin: 0 auto;
      ${({ spacing, theme, gutter }) => {
    return `padding: ${(theme.spacing[spacing] || spacing || theme.spacing.small)}px ${gutter || theme.gutterWidth}px;`
  }
}
  `,
  observer,
  Wrapper
)

import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import decorate from "lib/utils/decorate"
import { styled, t, p } from "lib/utils/theme"
import theme from "styles/theme"
import FaIcon from "./fa_icon"

export class SectionIntro extends React.Component {
  static propTypes = {
    align: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    heading: PropTypes.any,
    light: PropTypes.bool,
    linkPath: PropTypes.string,
    noPad: PropTypes.bool,
    style: PropTypes.object,
    title: PropTypes.any,
    wrapperIntro: PropTypes.bool,
  }

  static defaultProp = {
    style: {},
  }

  render() {
    const { className, children, title, heading, wrapperIntro, style, linkPath } = this.props

    const wrapperIntroStyle = {
      borderBottom: `1px solid ${theme.border}`,
      paddingBottom: `${theme.gutterHeight.value / 2}px`,
      marginBottom: `${theme.gutterHeight.value / 2}px`,
    }

    const _title = linkPath ? (
      <Link to={linkPath}>
        <FaIcon icon="link" /> {title}
      </Link>
    ) : (
      title
    )

    return (
      <div className={className} style={wrapperIntro ? wrapperIntroStyle : style}>
        {heading === 2 ? (
          <h2 className="page-intro__heading">{_title}</h2>
        ) : heading === 3 ? (
          <h3 className="page-intro__heading">{_title}</h3>
        ) : heading === 4 ? (
          <h4 className="page-intro__heading">{_title}</h4>
        ) : (
          <h1 className="page-intro__heading">{_title}</h1>
        )}
        {children && <div className="intro-text">{children}</div>}
      </div>
    )
  }
}

export default decorate(
  styled`
    text-align: ${p(`align`, `left`)};
    .modal & { padding-top: 0; }
    ${({ noPad, theme, spacing }) => {
    if (!noPad) {
      return `padding-bottom: ${(spacing || theme.gutterHeight.value) / 16}em;`
    }
  }}
    .intro-text {
  ${({ light, theme }) => {
    const color = light ? theme.background : theme.lightText
    return `
      color: ${color};
`
  }}
  ${({ light }) => {
    if (light) {
      return `
      a { color: white; }
      `
    }
  }}
    }
    .page-intro__heading {
      color: ${t(`headingText`)};
      margin: 0 0 2px;
  ${({ light }) => {
    if (light) {
      return `color: white;`
    }
  }}
    }
    .intro-text h2 {
      margin: 14px 0 ${props => props.gutterHeight || props.theme.gutterHeight.value}px;
      color: ${t(`lightText`)};
  ${({ light }) => {
    if (light) {
      return `color: white;`
    }
  }}
      font-weight: 500;
    }
    .intro-text h3 {
      margin: 10px 0 ${props => props.gutterHeight || props.theme.gutterHeight.value}px;
      color: ${t(`lightText`)};
  ${({ light }) => {
    if (light) {
      return `color: white;`
    }
  }}
      font-weight: 500;
    }
    p {
      margin: 10px 0 ${props => props.gutterHeight || props.theme.gutterHeight.value / 2}px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    input {
      margin-top: ${t(`spacing.medium`, t => t / 16)}em;
    }
    + {
      p, h1, h2, h3, h4 {
        margin-top: 10px;
      }
    }
    .btn {
      margin-top: 16px;
    }
`,
  SectionIntro,
)

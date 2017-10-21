import React from 'react'
import PropTypes from 'prop-types'
import decorate from 'utils/decorate'
import windowStore from 'stores/window'
import { styled, t } from 'utils/theme'

export class SectionIntro extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    heading: PropTypes.number,
    light: PropTypes.bool,
    title: PropTypes.string,
  }

  render() {
    const { className, children, title, heading } = this.props
    return (
      <div className={className}>
        {heading === 2 ?
          <h2 className="page-intro__heading">{title}</h2> :
          <h1 className="page-intro__heading">{title}</h1>}
        <div className="intro-text">
          {children}
        </div>
      </div>
    )
  }

}

export default decorate(
  styled`
    .modal & { padding-top: 0; }
    padding-bottom: ${t(`gutterHeight`, t=>t/16)}em;
    .intro-text {
      ${({ light, theme }) => {
    const color = light ? theme.background : theme.lightText
    return `color: ${color};`
  }}
    }
    h1.page-intro__heading, h2.page-intro__heading {
      color: ${t(`headingText`)};
      // margin: 0 0 ${t(`spacing.small`, t=>t/16)}em;
      margin: 0;
      ${windowStore.isSmall ? `font-size: 2em;` : ``};
      ${({ light }) => {
    if(light) {
      return `color: white;`
    }
  }}
    }
    .intro-text h3 {
      margin: 0;
      max-width: 800px;
      color: ${t(`lightText`)};
      ${({ light }) => {
    if (light) {
      return `color: white;`
    }
  }}
      font-weight: 500;
    }
    p {
      margin: 0;
      max-width: 800px;
      font-size: 1.125em;
    }
    input {
      margin-top: ${t(`spacing.medium`, t=>t/16)}em;
    }
    + {
      p, h1, h2, h3, h4 {
        margin-top: 0;
      }
    }
    .btn {
      margin-top: 16px;
    }
  `,
  SectionIntro
)
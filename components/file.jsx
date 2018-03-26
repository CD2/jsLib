import React from "react"
import PropTypes from "prop-types"
import { buildUrl } from "lib/utils/api_http"
import { styled } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
import Button from "./button"
import FaIcon from "./fa_icon"

export class File extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    defaultSrc: PropTypes.string,
    linkOnly: PropTypes.bool,
    linkTarget: PropTypes.string,
    onClick: PropTypes.func,
    uid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    wide: PropTypes.bool,
  }

  static defaultProps = {
    alt: ``,
    background: false,
    crop: false,
    wide: false,
  }

  get url() {
    const { uid } = this.props
    const params = { uid }
    return buildUrl([`/file`], params)
  }

  render() {
    const { defaultSrc, uid, children, linkOnly, linkTarget } = this.props

    let url = this.url
    if (!uid) {
      url = defaultSrc
    }
    if (linkOnly) {
      return (
        <a href={url} target={linkTarget ? linkTarget : `_blank`}>
          {children}
        </a>
      )
    }
    return (
      <Button
        to={linkTarget ? linkTarget : url}
        className={`file ${this.props.className}`}
        target="_blank"
        buttonStyle="download common"
        wide={this.props.wide}
        onClick={this.props.onClick}
      >
        <FaIcon icon="download" size={1.3} />
        {children}
      </Button>
    )
  }
}
export default decorate(
  styled`
    color: white;
    font-weight: 600;
    white-space: nowrap;
    i {
      margin-right: 6px;
      color: white;
    }
  `,
  File,
)

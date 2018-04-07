import React from "react"
import PropTypes from "prop-types"
import { styled } from "lib/utils/theme"
import decorate from "lib/utils/decorate"
import Button from "./button"
import FaIcon from "./fa_icon"
import { observable } from "mobx";
import { observer } from "mobx-react";
import { App } from "utils/store";

@observer
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

  componentDidMount(){
    this.fetchUrl()
  }

  async fetchUrl() {
    const { uid } = this.props
    const params = { uid }
    App.file(params).then(response=>
      this.url = response.data.url
    )
  }

  @observable url

  render() {
    const { defaultSrc, uid, children, linkOnly, linkTarget } = this.props
    if(!this.url) return ''

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

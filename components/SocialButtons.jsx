/* eslint-disable no-cond-assign */
import React from "react"
import PropTypes from "prop-types"
import decorate from "lib/utils/decorate"
import { styled } from "lib/utils/theme"
import {
  FacebookShareButton,
  TwitterShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share"

export class SocialButtons extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    round: PropTypes.bool,
    size: PropTypes.number,
  }

  static defaultProps = {
    round: true,
    size: 32,
  }

  render() {
    const url = window.location.href

    const { className, round, size } = this.props

    return (
      <div className={className}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={size} round={round} />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={size} round={round} />
        </TwitterShareButton>
        <GooglePlusShareButton url={url}>
          <GooglePlusIcon size={size} round={round} />
        </GooglePlusShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={size} round={round} />
        </LinkedinShareButton>
        <EmailShareButton body={url} url={url}>
          <EmailIcon size={size} round={round} />
        </EmailShareButton>
      </div>
    )
  }
}
export default decorate(
  styled`
    display: flex;

    .SocialMediaShareButton + .SocialMediaShareButton {
      margin-left: 4px;
    }
  `,
  SocialButtons,
)

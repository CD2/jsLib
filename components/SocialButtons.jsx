/* eslint-disable no-cond-assign */
import React from 'react'
import PropTypes from 'prop-types'

import decorate from 'lib/utils/decorate'
import { styled } from 'lib/utils/theme'

import {
  ShareButtons,
  generateShareIcon
} from 'react-share'

export class SocialButtons extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    const {
      FacebookShareButton,
      TwitterShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      EmailShareButton
    } = ShareButtons
    const FacebookIcon = generateShareIcon(`facebook`)
    const TwitterIcon = generateShareIcon(`twitter`)
    const GooglePlusIcon = generateShareIcon(`google`)
    const LinkedinIcon = generateShareIcon(`linkedin`)
    const EmailIcon = generateShareIcon(`email`)

    const url = window.location.href

    return (
      <div className={this.props.className}>
        <FacebookShareButton url={url}><FacebookIcon size={32} round /></FacebookShareButton>
        <TwitterShareButton url={url}><TwitterIcon size={32} round /></TwitterShareButton>
        <GooglePlusShareButton url={url}><GooglePlusIcon size={32} round /></GooglePlusShareButton>
        <LinkedinShareButton url={url}><LinkedinIcon size={32} round /></LinkedinShareButton>
        <EmailShareButton url={url}><EmailIcon size={32} round /></EmailShareButton>
      </div>
    )
  }

}
export default decorate(
  styled`
    display: flex;
  `,
  SocialButtons
)

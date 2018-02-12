import React from "react"
import shortid from "shortid"
import ReactJWPlayer from "react-jw-player"
import PropTypes from "prop-types"

import decorate from "lib/utils/decorate"
import JWPlayerTranscript from "lib/utils/jw_player_transcript"

import config from "libDependencies/jwPlayerConfig"

export class JWVideoPlayer extends React.Component {
  static propTypes = {
    autoPlay: PropTypes.bool,
    chapterListUrl: PropTypes.string,
    className: PropTypes.string,
    customProps: PropTypes.object,
    muted: PropTypes.bool,
    onComplete: PropTypes.func,
    onPlay: PropTypes.func,
    onProgress: PropTypes.func,
    showTranscript: PropTypes.bool,
    title: PropTypes.string,
    transcriptUrl: PropTypes.string,
    url: PropTypes.string,
    video: PropTypes.string,
  }

  static defaultProps = {
    autoPlay: false,
    className: ``,
    muted: false,
    onComplete: () => null,
    onPlay: () => null,
    onProgress: () => null,
    showTranscript: false,
  }

  constructor(props) {
    super(props)

    this.id = `jw_video__${shortid.generate()}`
  }

  handleReady = () => {
    const { showTranscript, chapterListUrl, transcriptUrl, video } = this.props

    if (showTranscript) {
      const transcript = new JWPlayerTranscript()

      transcript.loadTranscript(video, chapterListUrl, transcriptUrl)
    }
  }

  getPlaylist() {
    const { video, title, url } = this.props
    const videoURL = url || `//content.jwplatform.com/manifests/${video}.m3u8`
    const image = `https://assets-jpcust.jwpsrv.com/thumbs/${video}-720.jpg`

    return [{ sources: [{ file: videoURL }], image, title }]
  }

  render() {
    const {
      autoPlay,
      muted,
      onPlay,
      onProgress,
      onComplete,
      className,
      customProps,
    } = this.props

    return (
      <ReactJWPlayer
        className={`jw_player ${className}`}
        customProps={customProps}
        playerId={this.id}
        playerScript={config.script}
        playlist={this.getPlaylist()}
        isAutoPlay={autoPlay}
        isMuted={muted}
        onPlay={onPlay}
        onTime={onProgress}
        onOneHundredPercent={onComplete}
        onReady={this.handleReady}
      />
    )
  }
}
export default decorate(JWVideoPlayer)

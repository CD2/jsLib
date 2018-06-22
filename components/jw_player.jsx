import React from "react"
import shortid from "shortid"
import ReactJWPlayer from "react-jw-player"
import PropTypes from "prop-types"
import decorate from "lib/utils/decorate"
import JWPlayerTranscript from "lib/utils/jw_player_transcript"
import JWPlayerTranscriptNew from "lib/utils/jw_player_transcript_new"
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
    transcript_id: PropTypes.number,
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
    const { showTranscript, chapterListUrl, transcriptUrl, video, transcript_id } = this.props

    if (showTranscript) {
      const Component = this.props.transcript_id ? JWPlayerTranscriptNew : JWPlayerTranscript
      const transcript = new Component()

      transcript.loadTranscript(video, chapterListUrl, transcriptUrl, transcript_id)
    }
  }

  getPlaylist() {
    const { video, title, url } = this.props
    const videoURL = url || `//content.jwplatform.com/manifests/${video}.m3u8`
    const image = `https://assets-jpcust.jwpsrv.com/thumbs/${video}-720.jpg`

    return [{ sources: [{ file: videoURL }], image, title }]
  }

  render() {
    const { autoPlay, muted, onPlay, onPause, onProgress, onComplete, className, customProps } = this.props

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
        onPause={onPause}
        onTime={onProgress}
        onOneHundredPercent={onComplete}
        onReady={this.handleReady}
      />
    )
  }
}
export default decorate(JWVideoPlayer)

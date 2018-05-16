import React from "react"
import PropTypes from "prop-types"

export default class LoadingSpinner extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  static defaultProps = {
    className: null,
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className={`loading-spinner__spinner`} />
      </div>
    )
  }
}

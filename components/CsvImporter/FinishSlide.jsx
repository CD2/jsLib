import React from 'react'
import PropTypes from 'prop-types'

export default class FinishSlide extends React.Component {

  static propTypes = {
    failure: PropTypes.bool,
  }

  static defaultProps = {
    failure: false,
  }

  render = () => {
    if (this.props.failure) {
      return (
        <div>
          <h3>There was a problem processing your csv</h3>
          <p>Please reload the page and retry importing your file.</p>
        </div>
      )
    }

    return (
      <div>
        <h3>Your CSV was successfully processed</h3>
      </div>
    )
  }

}

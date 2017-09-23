import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export class TimeAgo extends React.Component {

  static propTypes = {
    time: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      time: new Date(props.time).getTime(),
      displayTime: ``,
    }
  }

  componentDidMount() {
    this.timeout()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  getInterval() {
    const diff = Date.now() - this.state.time

    if(diff < MINUTE) {
      return SECOND*5
    } else if(diff < HOUR) {
      return SECOND*15
    } else if(diff < DAY) {
      return MINUTE*15
    } 
    return null
    
  }

  timeout = (firstLoad=false) => {
    let interval = this.getInterval()
    const displayTime = moment(new Date(this.props.time)).fromNow()

    if(!firstLoad && this.state.displayTime !== displayTime) {
      this.setState({ displayTime })
    }
    if(interval) {
      this.timer = setTimeout(this.timeout, interval)
    }
  }

  render() {
    return (
      <span>{this.state.displayTime}</span>
    )
  }
}
export default TimeAgo

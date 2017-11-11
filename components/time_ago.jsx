import React from 'react'
import PropTypes from 'prop-types'
import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'
import moment from 'moment'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

@observer
export class TimeAgo extends React.Component {

  static propTypes = {
    time: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.timeout()
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  @observable displayTime = ``
  @computed get time() {
    return new Date(this.props.time).getTime()
  }

  getInterval() {
    const diff = Date.now() - this.time

    if (diff < MINUTE) {
      return SECOND*5
    } else if (diff < HOUR) {
      return SECOND*15
    } else if (diff < DAY) {
      return MINUTE*15
    }
    return null
  }

  @action timeout = () => {
    let interval = this.getInterval()
    this.displayTime = moment(new Date(this.props.time)).fromNow()

    if (interval) {
      this.timer = setTimeout(this.timeout, interval)
    }
  }

  render() {
    return (
      <span>{this.displayTime}</span>
    )
  }

}
export default TimeAgo

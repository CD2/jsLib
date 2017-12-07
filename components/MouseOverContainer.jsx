import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action, computed } from 'mobx'

@observer
export default class MouseOverContainer extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    mouseAttachment: PropTypes.node,
    noBoundaries: PropTypes.bool,
  }

  static defaultProps = {
    children: null,
    attachToMouse: null,
    noBoundaries: false,
  }

  componentDidMount() {
    window.addEventListener(`mousemove`, this.setPosition)
  }

  componentWillUnmount() {
    window.removeEventListener(`mousemove`, this.setPosition)
  }

  @observable x = null
  @observable y = null

  @computed get show() {
    return this.x || this.y
  }

  getOffset(element, keyName, parentName=`parentNode`, offset = 0) {
    const newOffset = element[keyName] ? element[keyName] + offset : offset

    if (element[parentName]) {
      return this.getOffset(element[parentName], keyName, parentName, newOffset)
    }

    return newOffset
  }

  @action setPosition = e => {
    let x = e.pageX - this.getOffset(e.target, `scrollLeft`)
    let y = e.pageY - this.getOffset(e.target, `scrollTop`)

    if (!this.props.noBoundaries) {
      const scrollTop = this.getOffset(this.container, `scrollTop`)
      const scrollLeft = this.getOffset(this.container, `scrollLeft`)
      const top = this.getOffset(this.container, `offsetTop`, `offsetParent`) - scrollTop
      const left = this.getOffset(this.container, `offsetLeft`, `offsetParent`) - scrollLeft
      const height = this.container.clientHeight
      const width = this.container.clientWidth
      const withinY = y > top && y < top + height
      const withinX = x > left && x < left + width

      if (!withinX || !withinY) {
        this.x = null
        this.y = null
        return
      }
    }

    this.x = x
    this.y = y
  }

  renderMouseAttachment = () => (
    <div style={{
      position: `fixed`,
      left: `${this.x}px`,
      top: `${this.y}px`,
      zIndex: 20000
    }}
    >
      {this.props.mouseAttachment}
    </div>
  )

  render = () => (
    <div ref={element => this.container = element}>
      {this.show ? this.renderMouseAttachment() : null}
      {this.props.children}
    </div>
  )

}

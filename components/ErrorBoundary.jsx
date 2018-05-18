import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { observable } from "mobx"
import { observer } from "mobx-react"

@withRouter
@observer
export default class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.onode,
  }

  constructor(props) {
    super(props)
    this.location = window.location.href
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.location !== window.location.href) {
      this.error = undefined
      this.info = undefined
      this.location = window.location.href
    }
  }

  componentDidCatch(error, info) {
    this.error = error
    console.error(error, info.componentStack)
  }

  @observable error
  @observable info
  @observable location

  render() {
    if (this.error) {
      return (
        <pre style={{ padding: `8px 16px` }}>
          Something went wrong. {this.error.toString()}
        </pre>
      )
    }
    return this.props.children
  }
}
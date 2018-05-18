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
      this.location = window.location.href
    }
  }

  componentDidCatch(error, info) {
    this.error = error
    console.error(error, info.componentStack)
  }

  @observable error
  @observable location

  render() {
    if (this.error) {
      return (
        <div style={{ padding: `4px` }}>
          <img 
            alt="error icon" 
            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4OC40NTEgNDg4LjQ1MSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg4LjQ1MSA0ODguNDUxOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8cGF0aCBkPSJNNDg0LjEyNSw0MTIuMDEzbC0yMTIuMi0zNjcuNmMtMTIuMy0yMS4zLTQzLjEtMjEuMy01NS40LDBsLTIxMi4yLDM2Ny42Yy0xMi4zLDIxLjMsMy4xLDQ4LDI3LjcsNDhoNDI0LjQgICBDNDgxLjAyNSw0NjAuMDEzLDQ5Ni40MjUsNDMzLjMxMyw0ODQuMTI1LDQxMi4wMTN6IE0yNDQuNTI1LDE1Ny42MTNjMTMuNiwwLDI0LjYsMTEuMywyNC4yLDI0LjlsLTQsMTM5LjYgICBjLTAuMywxMS05LjMsMTkuNy0yMC4zLDE5LjdzLTIwLTguOC0yMC4zLTE5LjdsLTMuOS0xMzkuNkMyMTkuOTI1LDE2OC45MTMsMjMwLjgyNSwxNTcuNjEzLDI0NC41MjUsMTU3LjYxM3ogTTI0NC4yMjUsNDEwLjExMyAgIGMtMTMuOSwwLTI1LjItMTEuMy0yNS4yLTI1LjJjMC0xMy45LDExLjMtMjUuMiwyNS4yLTI1LjJzMjUuMiwxMS4zLDI1LjIsMjUuMlMyNTguMTI1LDQxMC4xMTMsMjQ0LjIyNSw0MTAuMTEzeiIgZmlsbD0iI0Q4MDAyNyIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" 
            style={{ width: `24px` }}
          />
        </div>
      )
    }
    return this.props.children
  }
}
import React from "react"
import PropTypes from "prop-types"
import { Switch } from "react-router-dom"
import { withAuth, isAuthed } from "./index"

@withAuth
export default class AuthSwitch extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.node,
  }

  render() {
    const routes = React.Children.map(this.props.children, elem => {
      if (!elem) return null
      return elem.props.permission && !isAuthed(this.props.auth, elem.props.permission)
        ? null
        : elem
    })
    return <Switch>{routes}</Switch>
  }
}

import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router-dom"
import { withAuth, isAuthed } from "./index"

@withAuth
export default class AuthRoute extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    permission: PropTypes.any,
  }

  render() {
    return isAuthed(this.props.auth, this.props.permission) ? (
      <Route {...this.props} />
    ) : (
      <b>Unauthorized</b>
    )
  }
}

import React from "react"
import PropTypes from "prop-types"
import { Switch, withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import currentUser from "stores/currentUser"
import { withAuth } from "./with_auth"

@withRouter
@withAuth
@observer
export default class AuthSwitch extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.node,
  }

  componentDidUpdate() {
    currentUser.fetchAllData(true)
  }

  render() {
    return (
      <Switch>
        {React.Children.map(
          this.props.children,
          elem =>
            !elem || (elem.props.permission && !currentUser.isAuthed(elem.props.permission))
              ? null
              : elem,
        )}
      </Switch>
    )
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import { withAuth, isAuthed } from './index'

@withAuth
export class HasPermission extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.node,
    notAllowed: PropTypes.string,
    permission: PropTypes.string,
  }

  render() {
    const { auth, permission, children, notAllowed } = this.props
    const aProps = { ...this.props }
    delete aProps.auth
    delete aProps.permission

    if (notAllowed) {
      return isAuthed(auth, notAllowed)
        ? null
        : React.Children.only(children)
    }

    return isAuthed(auth, permission)
      ? React.Children.only(children)
      : null
  }

}
export default HasPermission

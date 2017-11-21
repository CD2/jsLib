import React from 'react'
import PropTypes from 'prop-types'
import { withAuth, isAuthed } from './index'

@withAuth
export class HasPermission extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    children: PropTypes.node,
    permission: PropTypes.string,
  }

  render() {
    const { auth, permission, children } = this.props
    const aProps = { ...this.props }
    delete aProps.auth
    delete aProps.permission
    return isAuthed(auth, permission)
      ? React.Children.only(children)
      : null
  }

}
export default HasPermission

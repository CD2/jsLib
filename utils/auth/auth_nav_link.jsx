import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { withAuth, isAuthed } from './index'

@withAuth
export class AuthNavLink extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    permission: PropTypes.string,
  }

  render() {
    const { auth, permission } = this.props
    const aProps = { ...this.props }
    delete aProps.auth
    delete aProps.permission
    return isAuthed(auth, permission)
      ? (<NavLink {...aProps} />)
      : null
  }

}
export default AuthNavLink
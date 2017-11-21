import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withAuth, isAuthed } from './index'

@withAuth
export class AuthLink extends React.Component {

  static propTypes = {
    auth: PropTypes.object,
    permission: PropTypes.string,
  }

  render() {
    const { auth, permission } = this.props
    return isAuthed(auth, permission)
      ? (<Link {...this.props} permission={undefined} />)
      : null
  }

}
export default AuthLink
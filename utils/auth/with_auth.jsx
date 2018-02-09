import React from "react"
import PropTypes from "prop-types"

export const withAuth = Component =>
  class extends React.Component {
    static displayName = `withAuth(${Component.name})`
    static contextTypes = {
      auth: PropTypes.object,
    }
    render() {
      if (!this.context.auth) {
        throw new Error(`Cannot use withAuth outside of an AuthProvider`)
      }
      return <Component {...this.props} auth={this.context.auth} />
    }
  }

export default withAuth

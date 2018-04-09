import React from "react"
import PropTypes from "prop-types"
import {observer, inject} from 'mobx-react'
import currentUser from 'stores/currentUser'
import LoadingSpinner from "../../../lib/components/loading_spinner"

@inject('session')
@observer
export const withAuth = Component =>
  class extends React.Component {
    static displayName = `withAuth(${Component.name})`

    async componentDidMount() {
      await this.props.session.verifyCredentials()
      currentUser.fetchAllData()
    }

    get sessionParams() {
      return {
        subdomain: this.props.session.subdomain,
        user_id: this.props.session.userId,
        school_id: this.props.session.school_id,
        school_name: this.props.session.school_name
      }
    }

    render() {
      if(!this.props.session.connected || !currentUser.connected) return <LoadingSpinner />
      return <Component {...this.props} auth={{...this.sessionParams, ...currentUser.data}} />
    }
  }

export default withAuth

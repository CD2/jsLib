/* eslint-disable react/no-set-state */
import React from "react"
import PropTypes from "prop-types"

import { get } from "lib/utils/api_http"

export default class AuthProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    defaultAuth: PropTypes.any,
    localStorageKey: PropTypes.string,
    url: PropTypes.string,
  }

  static defaultProps = {
    defaultAuth: {},
  }

  static childContextTypes = {
    auth: PropTypes.object,
  }

  constructor(props) {
    super(props)

    const retreived = this.retrieveAuth()
    this.state = {
      auth: this.buildContext(retreived === undefined ? props.defaultAuth : retreived),
    }
  }

  getChildContext() {
    return { auth: this.state.auth }
  }

  componentDidMount() {
    this.verify()
  }

  storeAuth(data) {
    const { localStorageKey } = this.props
    if (!localStorageKey) return
    data = JSON.stringify(data)
    window.sessionStorage.setItem(localStorageKey, data)
  }

  retrieveAuth() {
    const { localStorageKey } = this.props
    if (!localStorageKey) return
    try {
      const data = window.sessionStorage.getItem(localStorageKey)
      if (data) return JSON.parse(data)
    } catch (e) {
      console.error(`Cant obtain headers`, e)
      return {
        sign_in_confirmed: false,
        user_id: null,
        roles: [`anonymous`],
        data: {},
      }
    }
  }

  buildContext(data = {}) {
    return {
      ...data,
      reAuth: this.verify.bind(this),
    }
  }

  verify() {
    return get(this.props.url).then(response => {
      this.storeAuth(response.data)
      this.setState({ auth: this.buildContext(response.data) })
    })
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

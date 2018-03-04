import React, { Component } from "react"
import PropTypes from "prop-types"
import GoogleAnalytics from "react-ga"
import { reaction } from "mobx"
import RouteChangesStore from "lib/stores/RouteChanges"

GoogleAnalytics.initialize(`UA-102356921-1`)

function trackPage(page) {
  GoogleAnalytics.pageview(page)
}

export default (WrappedComponent, options = {}) => {
  return class WithTracker extends Component {
    static propTypes = {
      location: PropTypes.object,
    }

    componentDidMount() {
      trackPage(this.props.location.pathname)
      this.triggerTrackPage = reaction(
        () => RouteChangesStore.changeCounter,
        () => trackPage(this.props.location.pathname),
      )
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
}

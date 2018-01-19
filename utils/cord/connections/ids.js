/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { inject, observer } from "mobx-react"
import PropTypes from "prop-types"
import LoadingSpinner from "lib/components/loading_spinner"
import defaultConnectIdsFactories from "./ids_factories"
import match from "./match"

export default function(connectIds) {
  return Component => {
    const getIdsRequest = match(connectIds, defaultConnectIdsFactories, `connectIds`)
    const cord = this

    @inject(`cordStore`)
    @observer
    class ConnectedIds extends React.Component {
      static propTypes = {
        cordStore: PropTypes.object,
      }

      componentDidMount() {
        const idsRequest = getIdsRequest(this.props)
        Object.values(idsRequest).forEach(requestData => {
          this.props.cordStore.fetchIds(cord, requestData)
        })
      }

      render() {
        const idsRequest = getIdsRequest(this.props)
        const { cordStore } = this.props

        let loaded = true
        const ids = Object.entries(idsRequest).reduce((ids, [prop_name, requestData]) => {
          if (!cordStore.idsLoaded(cord, requestData)) {
            loaded = false
            return ids
          }
          ids[prop_name] = [...cordStore.getIds(cord, requestData)]
          return ids
        }, {})

        if (!loaded) return <LoadingSpinner className="full-screen" />

        const props = { ...this.props, ...ids }
        delete props.cordStore
        return <Component {...props} />
      }
    }
    return ConnectedIds
  }
}

/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { inject } from 'mobx-react'
import PropTypes from 'prop-types'

export default function({ as=`fetchIds` } = {}) {
  const cord = this
  return (Component) => {
    @inject(`cordStore`)
    class ConnectedIdFetcher extends React.Component {

      static propTypes = {
        cordStore: PropTypes.object,
      }

      fetcher = (scope, opts) => {
        const url = this.props.cordStore.idsPath(cord.path)
        return this.props.cordStore.get(url, { scope, ...opts }).
          then(data => data[cord.table_name].ids)
      }

      render() {
        const props = { ...this.props }
        delete props.cordStore
        props[as] = this.fetcher
        return (
          <Component {...props} />
        )
      }

    }

    return ConnectedIdFetcher
  }
}

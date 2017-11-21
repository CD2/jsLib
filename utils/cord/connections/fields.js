/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import PropTypes from 'prop-types'
import match from './match'
import { attributesFactories } from './record_factories'
import LoadingSpinner from 'components/app/parts/loading_spinner'

export default function connectFields({
  scope=`all`,
  fields=[],
  as=this.defaultAs,
  reloadAs=`reload`,
  formatter=null,
}={}) {
  const cord = this
  const getFields = match(fields, attributesFactories, `connectRecordFields`)

  return (Component) => {
    @inject(`cordStore`)
    @observer
    class ConnectedIds extends React.Component {

      static propTypes = {
        cordStore: PropTypes.object,
      }

      componentDidMount = () => this.fetch()
      reload = () => this.fetch({ reload: true })
      getFormattedProps = props => formatter ? { ...props, ...formatter(props) } : props

      fetch = (options = {}) => {
        return this.props.cordStore.fetchFields(
          cord,
          getFields(this.props),
          { ...options, scope }
        )
      }

      render() {
        const { cordStore } = this.props
        const loaded = cordStore.idsLoaded(cord, { scope })
        if (!loaded) return <LoadingSpinner className="full-screen" />

        const ids = cordStore.getIds(cord, { scope })
        const records = ids.map(id => cordStore.getRecord(cord, id))

        let props = { ...this.props }
        delete props.cordStore
        props[as] = records
        props[reloadAs] = this.reload
        props = this.getFormattedProps(props)

        return (
          <Component {...props} />
        )
      }

    }
    return ConnectedIds
  }
}

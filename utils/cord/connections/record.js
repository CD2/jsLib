/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { inject, observer } from "mobx-react"
import PropTypes from "prop-types"
import match from "./match"
import { idFactories, attributesFactories } from "./record_factories"

export default function({
  condition = null,
  id = this.defaultPropName,
  as = this.defaultAs,
  attributes = [],
  reloadAs = `reload`,
  formatter = null,
} = {}) {
  const cord = this
  const getId = match(id, idFactories, `connectRecordIds`)
  const getAttributes = match(attributes, attributesFactories, `connectRecordAttributes`)

  return Component => {
    @inject(`cordStore`)
    @observer
    class ConnectedIds extends React.Component {
      static propTypes = {
        cordStore: PropTypes.object,
      }

      componentDidMount() {
        if (!condition || condition(this.props)) {
          this.fetch()
        }
      }

      componentWillReceiveProps(props) {
        if (!condition || condition(props)) {
          this.fetch(props)
        }
      }

      reload = () => this.fetch(this.props, { reload: true })
      getFormattedProps = props => (formatter ? { ...props, ...formatter(props) } : props)

      fetch = (props = this.props, { reload = false } = {}) => {
        const id = getId(props)
        const attributes = getAttributes(props)
        if (Array.isArray(id)) {
          id.map(id => this.props.cordStore.fetchRecord(cord, id, attributes, { reload }))
        } else {
          this.props.cordStore.fetchRecord(cord, id, attributes, { reload })
        }
      }

      render() {
        if (condition && !condition(this.props)) return <Component {...this.props} />
        const id = getId(this.props)
        const attributes = getAttributes(this.props)

        if (Array.isArray(id)) {
          let loaded = true
          let records = []
          id.forEach(id => {
            if (!loaded || !this.props.cordStore.isRecordLoaded(cord, id, attributes)) {
              return (loaded = false)
            }
            records.push(this.props.cordStore.getRecord(cord, id))
          })

          let props = { ...this.props }
          delete props.cordStore
          props[as] = records
          props[reloadAs] = this.reload
          props = this.getFormattedProps(props)

          return <Component {...props} />
        }
        if (!this.props.cordStore.isRecordLoaded(cord, id, attributes)) {
          if (Component.renderLoading) return Component.renderLoading()
          return null
        }
        const record = this.props.cordStore.getRecord(cord, id)

        let props = { ...this.props }
        delete props.cordStore
        props[as] = record
        props[reloadAs] = this.reload
        props = this.getFormattedProps(props)

        return <Component {...props} />
      }
    }
    return ConnectedIds
  }
}

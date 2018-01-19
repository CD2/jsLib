/* eslint-disable react/jsx-filename-extension */
import React from "react"
import PropTypes from "prop-types"
import { Provider } from "mobx-react"

import CordStore from "./cord_store"

export class CordProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    store: PropTypes.instanceOf(CordStore).isRequired,
  }

  render() {
    const { children, store } = this.props
    return <Provider cordStore={store}>{React.Children.only(children)}</Provider>
  }
}
export default CordProvider

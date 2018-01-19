import React from "react"
import PropTypes from "prop-types"

export const withTheme = Component =>
  class extends React.Component {
    static displayName = `withTheme(${Component.name})`
    static contextTypes = {
      theme: PropTypes.object,
    }
    render() {
      if (!this.context.theme) throw new Error(`Cannot use withTheme outside of a ThemeProvider`)
      return <Component {...this.props} theme={this.context.theme} />
    }
  }

export default withTheme

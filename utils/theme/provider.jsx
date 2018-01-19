import React from "react"
import PropTypes from "prop-types"

export class ThemeProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    theme: PropTypes.object.isRequired,
  }

  static childContextTypes = {
    theme: PropTypes.object.isRequired,
  }

  getChildContext() {
    return { theme: this.props.theme }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
export default ThemeProvider

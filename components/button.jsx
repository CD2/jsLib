import React from "react"
import PropTypes from "prop-types"
import invariant from "invariant"
import { Link } from "react-router-dom"
import { observer } from "mobx-react"

@observer
export default class Button extends React.Component {
  static propTypes = {
    buttonStyle: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    external: PropTypes.bool,
    handleOnclick: PropTypes.func,
    onClick: PropTypes.func,
    processing: PropTypes.bool,
    style: PropTypes.object,
    target: PropTypes.string,
    to: PropTypes.string,
    wide: PropTypes.bool,
  }

  static defaultProps = {
    buttonStyle: `common`,
    external: false,
    processing: false,
    wide: false,
  }

  getChildren = () => {
    const { processing, children } = this.props
    if (processing) {
      return null
    }

    return children
  }

  render() {
    let { className, to, external, buttonStyle, children, target, processing, style } = this.props

    invariant(!(external && !to), `prop \`to\` is required if \`external\` is present`)

    let Comp = `div`
    className = `${className} ${buttonStyle} btn`

    const onClick = this.props.onClick || this.props.handleOnclick
    let props = { className, to, onClick, children, target, style }

    if (to) {
      if (external) {
        Comp = `a`
        props.href = props.to
        delete props.to
      } else {
        Comp = Link
      }
    }

    const processingProp = processing ? { onClick: () => null } : {}

    return <Comp {...{ ...props, ...processingProp }}>{this.getChildren()}</Comp>
  }
}

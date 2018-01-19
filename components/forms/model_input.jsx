import React from "react"
import PropTypes from "prop-types"
import { Input } from "lib/components/forms"
import { observer } from "mobx-react"

@observer
export class ModelInput extends React.Component {
  static propTypes = {
    model: PropTypes.object,
    name: PropTypes.string,
    onChange: PropTypes.func,
  }

  handleChange = e => this.props.model.set(e.name, e.value)

  render() {
    const { model, name } = this.props
    return (
      <Input
        {...this.props}
        value={model.get(name)}
        errors={model.getError(name)}
        onChange={this.props.onChange ? this.props.onChange : this.handleChange}
      />
    )
  }
}

export default ModelInput

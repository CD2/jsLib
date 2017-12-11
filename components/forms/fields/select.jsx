import React from 'react'
import PropTypes from 'prop-types'

export class SelectField extends React.Component {

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    default_value: PropTypes.string,
    disabled: PropTypes.bool,
    includeBlank: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.PropTypes.any,
  }

  static defaultProps = {
    choices: [],
    disable: false,
    value: ``,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  renderChoices() {
    const { choices, includeBlank } = this.props
    const choiceHtml = []
    if (includeBlank) {
      const text = typeof includeBlank === `string` ? includeBlank : `--select--`
      choiceHtml.push(<option key="$BLANK$" value="">{text}</option>)
    }
    choices.forEach(choice => {
      let text
      let value
      if (typeof choice === `string`) {
        text = choice
        value = choice
      } else {
        text = choice.text
        value = choice.value
      }
      if (this.props.default_value === value){
        choiceHtml.push(<option key={value} value={value} selected="selected">{text}</option>)
      } else {
        choiceHtml.push(<option key={value} value={value}>{text}</option>)
      }
    })
    return choiceHtml
  }

  render() {
    const { name, value, disabled } = this.props
    return (
      <select
        name={name}
        className="select"
        value={value}
        disabled={disabled}
        onChange={this.handleChange}
      >
        {this.renderChoices()}
      </select>
    )
  }

}
export default SelectField

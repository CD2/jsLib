import React from 'react'
import PropTypes from 'prop-types'

export default class SelectField extends React.Component {

  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.object),
    includeBlank: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.string,
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
      choiceHtml.push(<option key={value} value={value}>{text}</option>)
    })
    return choiceHtml
  }

  render() {
    const { name, value } = this.props
    return (
      <select
        name={name}
        className="select"
        value={value}
        onChange={this.handleChange}
      >
        {this.renderChoices()}
      </select>
    )
  }

}

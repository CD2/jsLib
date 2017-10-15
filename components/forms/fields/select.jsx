import React from 'react'
import PropTypes from 'prop-types'

export default class SelectField extends React.Component {


  static propTypes = {
    choices: PropTypes.arrayOf(PropTypes.string),
    includeBlank: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    let value = e.target.value
    if (value === ``) value = null
    if (onChange) onChange({ name: e.target.name, value })
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
    return (
      <select
        {...this.props}
        className="select"
        onChange={this.handleChange}
      >
        {this.renderChoices()}
      </select>
    )
  }

}

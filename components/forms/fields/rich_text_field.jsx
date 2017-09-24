import React from 'react'
import PropTypes from 'prop-types'
import RichTextInput from './rich_text_box'

import 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'

export default class RichTextBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    full_editor: PropTypes.bool,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.string,
  }

  handleChange = (value) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(value)
    if (onChange) onChange({ name: this.props.name, value })
  }

  render() {
    return(
      <RichTextInput
        className={this.props.className}
        value={this.props.value}
        onChange={this.handleChange}
        full_editor={this.props.full_editor}
      />
    )
  }
}

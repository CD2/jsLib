import React from 'react'
import PropTypes from 'prop-types'
import RichTextInput from './rich_text_box'

import 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'

export class RichTextBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    full_editor: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.string,
  }

  handleChange = (value) => {
    const { onRawChange, onChange, name } = this.props
    if (onRawChange) onRawChange(value)
    if (onChange) onChange({ name: name, value })
  }

  render() {
    return(
      <RichTextInput
        className={this.props.className}
        value={this.props.value || ``}
        full_editor={this.props.full_editor}
        onChange={this.handleChange}
      />
    )
  }

}
export default RichTextBox

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
    disabled: PropTypes.bool,
    full_editor: PropTypes.bool,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    onBlur: () => null,
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
        value={this.props.value || ``}
        disabled={this.props.disabled}
        full_editor={this.props.full_editor}
        onChange={this.handleChange}
        onBlur={this.props.onBlur}
      />
    )
  }

}

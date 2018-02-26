import React from "react"
import PropTypes from "prop-types"

import tinymce from "tinymce"
import "tinymce/themes/modern"
import "tinymce/plugins/lists"
import "tinymce/plugins/link"
import "tinymce/plugins/table"
import "tinymce/plugins/anchor"
import "tinymce/plugins/code"
import "tinymce/plugins/textcolor"
import "tinymce/plugins/colorpicker"

import { observer } from "mobx-react"
import { observable } from "mobx"

@observer
export class RichTextBox extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    full_editor: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  static defaultProps = {
    disabled: false,
    full_editor: true,
  }
  componentDidMount() {
    let toolbar = `bold italic removeformat | bullist numlist | table | link`
    let height = `150`
    if (this.props.full_editor) {
      toolbar = `formatselect | bold italic strikethrough forecolor backcolor | link anchor |
      alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |
      removeformat code`
      if (innerWidth > 700) height = `300`
    }
    tinymce.init({
      target: this.target,
      skin_url: `/tinymce/lightgray`,
      branding: false,
      menubar: false,
      elementpath: false,
      browser_spellcheck: true,
      readonly: this.props.disabled ? 1 : 0,
      plugins: [`lists link table anchor code textcolor`],
      toolbar,
      height,
      init_instance_callback: editor => {
        this.editor = editor
        editor.on(`keyup change`, () => this.handleChange(editor))
        if (this.props.value) {
          this.value = this.props.value
          editor.setContent(this.props.value)
        }
      },
    })
  }

  componentWillReceiveProps(props) {
    if (this.editor && props.value !== this.value) {
      this.value = props.value
      let bookmark = this.editor.selection.getBookmark(2, true)
      this.editor.setContent(props.value || ``)
      this.editor.selection.moveToBookmark(bookmark)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillUnmount() {
    tinymce.remove(this.editor)
    this.editor = undefined
  }

  @observable value = ``
  @observable setup = false

  handleChange = editor => {
    const valueIsEmpty =
      editor.getContent({ format: `text` }).trim().length === 0
    const value = valueIsEmpty ? `` : editor.getContent()
    const { onChange } = this.props
    this.value = value
    if (onChange) onChange(value)
  }

  render() {
    return (
      <div className='rich-text'>
        <textarea id={this.props.name} ref={elem => (this.target = elem)} />
      </div>
    )
  }
}
export default RichTextBox

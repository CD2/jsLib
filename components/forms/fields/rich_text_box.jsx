import React from 'react'
import PropTypes from 'prop-types'

import tinymce from 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/anchor'
import { styled, t } from 'utils/theme'

import { observer } from 'mobx-react'
import { observable } from 'mobx'

@styled`
  border-radius: ${t(`panelRadius`)};
  overflow: hidden;
  border: 1px solid ${t(`border`)};
  background: white;
`
@observer
export class RichTextBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    full_editor: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  componentDidMount() {
    let toolbar = `bold italic removeformat | bullist numlist | table | link`
    let height = `150`
    if (this.props.full_editor) {
      toolbar = `formatselect | bold italic strikethrough forecolor backcolor | link anchor |
      alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  |
      removeformat`
      height = `400`
    }
    tinymce.init({
      target: this.target,
      skin_url: `/tinymce/lightgray`,
      branding: false,
      menubar: false,
      elementpath: false,
      browser_spellcheck: true,

      plugins: [
        `lists link table anchor`
      ],
      toolbar,
      height,
      init_instance_callback: editor => {
        this.editor = editor
        editor.on(`keyup change`, () => this.handleChange(editor.getContent()))
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

  handleChange = (value) => {
    const { onChange, name } = this.props
    this.value = value
    if (onChange) onChange({ name, value })
  }

  render() {
    return (
      <div className={this.props.className}>
        <textarea
          id={this.props.name}
          ref={(elem) => this.target = elem}
        />
      </div>
    )
  }

}
export default RichTextBox

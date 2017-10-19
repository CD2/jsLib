import React from 'react'
import PropTypes from 'prop-types'

import tinymce from 'tinymce'
import 'tinymce/themes/modern'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/link'
import 'tinymce/plugins/table'
import 'tinymce/plugins/anchor'
import { styled } from 'utils/theme'
import { panel } from 'utils/common_styles'

import { observer } from 'mobx-react'
import { observable } from 'mobx'

@styled`
  ${panel};
`
@observer
export default class RichTextBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    full_editor: PropTypes.bool,
    id: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.string,
  };

  static defaultProps = {
    onBlur: () => null,
  };

  componentDidMount() {
    let toolbar = `bold italic removeformat | bullist numlist | table | link`
    let height = `150`
    if (this.props.full_editor) {
      toolbar = `formatselect | bold italic strikethrough forecolor backcolor
        | link anchor | alignleft aligncenter alignright alignjustify
        | numlist bullist outdent indent  | removeformat`
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
      var bookmark = this.editor.selection.getBookmark(2, true)
      this.editor.setContent(props.value)
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
    const { onChange } = this.props
    this.value = value
    if (onChange) onChange(value)
  }

  render() {
    return(
      <div className={this.props.className}>
        <textarea
          id={this.props.id}
          ref={(elem) => this.target = elem}
          disabled={this.props.disabled}
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }

}

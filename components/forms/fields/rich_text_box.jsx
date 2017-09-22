import React from 'react'
import PropTypes from 'prop-types'

import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';
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
    id: PropTypes.string,
    className: PropTypes.string,

    onChange: PropTypes.func,
    value: PropTypes.string,

    full_editor: PropTypes.bool,
  };

  @observable value = ''

  constructor() {
    super()
    this.className = `tiny_mouse_${Math.round(Math.random()*1000)}`

    this.state = {
      value: '',
    }
  }

  componentDidMount() {
    let toolbar = 'bold italic removeformat | bullist numlist | table | link'
    let height = '150'
    if (this.props.full_editor) {
      toolbar = 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'
      height = '400'
    }
    tinymce.init({
      target: this.target,
      skin_url: '/tinymce/lightgray',
      branding: false,
      menubar: false,
      elementpath: false,
      browser_spellcheck: true,

      plugins: [
        'lists link table'
      ],
      toolbar,
      height,
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          this.handleChange(editor.getContent())
        });
        // if (this.props.value) editor.setContent('asd' + this.props.value);
      }
    });
    this.value = this.props.value
  }

  componentWillUnmount() {
    tinymce.remove(this.editor);
  }

  componentWillReceiveProps(props) {
    if (props.value !== this.value) {
      this.value = props.value
      var bookmark = this.editor.selection.getBookmark(2, true);
      this.editor.setContent(props.value);
      this.editor.selection.moveToBookmark(bookmark);
    }
  }

  shouldComponentUpdate() {
    return false
  }

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
        />
      </div>
    );
  }
}

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
      toolbar: 'bold italic removeformat | bullist numlist | table | link',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup change', () => {
          this.handleChange(editor.getContent())
        });
      }
    });
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
    if(this.editor) {
      this.value = this.props.value
      this.editor.setContent(this.props.value);
    }

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

import React from 'react'
import PropTypes from 'prop-types'

import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';

export default class RichTextBox extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,

    onChange: PropTypes.func,
    value: PropTypes.string,
  };

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
    // this.editor.setContent(this.props.value);
  }

  componentWillUnmount() {
    tinymce.remove(this.editor);
  }

  componentWillReceiveProps(props) {
    // var bookmark = this.editor.selection.getBookmark(2, true);
    // this.editor.setContent(props.value);
    // this.editor.selection.moveToBookmark(bookmark);
  }

  shouldComponentUpdate() {
    return false
  }

  handleChange = (value) => {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render() {
    let className = this.className
    if (this.props.className) className += ` ${this.props.className}`
    return(
      <div className="tinymce__container">
        <textarea
          id={this.props.id}
          ref={(elem) => this.target = elem}
          className={className}
        />
      </div>
    );
  }
}

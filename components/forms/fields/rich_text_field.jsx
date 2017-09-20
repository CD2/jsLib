import React from 'react'
import PropTypes from 'prop-types'
import TinyMCE from 'utils/tinymce';
console.log(TinyMCE)
import 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/link';
import 'tinymce/plugins/table';

export default class RichTextBox extends React.Component {

  static propTypes = {
    className: PropTypes.string,

    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.string,
  };

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({name: this.props.name, value: e.target.getContent() })
  }

  render() {
    return(
      <div>{this.props.value}<TinyMCE
        className={this.props.className}
        content={this.props.value}
        config={{
          skin_url: '/tinymce/lightgray',
          branding: false,
          menubar: false,
          elementpath: false,
          browser_spellcheck: true,
          plugins: 'lists link table',
          toolbar: 'bold italic removeformat | bullist numlist | table | link',
        }}
        onChange={this.handleChange}
      /></div>
    );
  }
}

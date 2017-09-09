import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

const FIELD_TYPES = {
  text: require('./fields/text_field').default,
  rich_text: require('./fields/rich_text_field').default,
}


@styled`
  margin-bottom: 10px;
  input {
    box-sizing: border-box;
    color: ${t('text')};
    font-family: ${t('font')};
    text-transform: none;
    width: 100%;
    padding: 10px 6px 9px;
    background-color: transparent;
    border: 2px solid;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 3px;
    outline: none;
    cursor: pointer;in-top: 4px;
    background: white;
  }
`
export default class Input extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'text',
  }

  getType(type) {
    return FIELD_TYPES[type] || FIELD_TYPES['text']
  }

  render() {
    const { label, type } = this.props
    const Field = this.getType(type)
    return (
      <div className={this.props.className}>
        <label>
          {label}
          <Field {...this.props} />
        </label>
      </div>
    )
  }

}

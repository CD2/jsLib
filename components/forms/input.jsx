import React from 'react'
import PropTypes from 'prop-types'
import dropdown from 'images/dropdown.svg'
import { styled, t } from 'utils/theme'

const FIELD_TYPES = {
  text: require('./fields/text').default,
  textarea: require('./fields/textarea').default,
  rich_text: require('./fields/rich_text_field').default,
  password_with_help: require('./fields/password_with_help').default,
  select: require('./fields/select').default,
  checkbox: require('./fields/checkbox').default,
  date: require('./fields/date').default,
  tags: require('./fields/tags').default,
  radiogroup: require('./fields/radiogroup').default,
}

@styled`
margin-bottom: 10px;
  input[type=email],
  input[type=text],
  input[type=search],
  input[type=password],
  textarea,
  select{
    box-sizing: border-box;
    color: ${t('text')};
    font-family: ${t('font')};
    text-transform: none;
    width: 100%;
    font-size: 0.9em;
    padding: 10px 10px 9px;
    background-color: transparent;
    border: 1px solid ${t('border')};
    height: 48px;
    line-height: 28px;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    background: white;
    -webkit-appearance: none;
    &:focus {
      border: 1px solid ${t('primary')};
      outline: none;
    }
  }
  
  select{
    background-image: url(${dropdown});
    background-size: 10px;
    background-position: 98% 50%;
    background-repeat: no-repeat;
  }
  
  textarea {
    height: 100px;
  }
  .validation-error {
    color: ${t('error')};
    font-size: 0.8em;
    display: block;
    text-align: right;
    font-weight: 600;
  }
  .description {
    margin: 0;
    font-size: 0.9em;
    font-weight: 600;
    color: ${t('lightText')};
  }
  label {
    color: black;
    font-weight: 600;
  }

`
export default class Input extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }

  getType(type) {
    return FIELD_TYPES[type] || FIELD_TYPES['text']
  }

  renderErrors() {
    const { errors } = this.props
    if (errors) {
      return errors.map(err => <span className="validation-error">{err}</span>)
    }
  }

  render() {
    const { label, type, description } = this.props
    const Field = this.getType(type)

    if (label) {
      return (
        <div className={this.props.className}>
          {this.renderErrors()}
          <label>
            {label}
            <Field {...this.props} className="field"/>
            <p className="description">{description}</p>
          </label>
        </div>
      )
    } else {
      return (
        <div className={this.props.className}>
          {this.renderErrors()}
          <Field {...this.props} className="field"/>
          <p className="description">{description}</p>
        </div>
      )
    }


  }

}

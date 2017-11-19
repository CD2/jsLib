import React from 'react'
import PropTypes from 'prop-types'
import dropdown from 'images/dropdown.svg'
import { styled, t } from 'utils/theme'

const FIELD_TYPES = {
  text: require(`./fields/text`).default,
  textarea: require(`./fields/textarea`).default,
  rich_text: require(`./fields/rich_text_box`).default,
  password_with_help: require(`./fields/password_with_help`).default,
  select: require(`./fields/select`).default,
  checkbox: require(`./fields/checkbox`).default,
  date: require(`./fields/date`).default,
  tags: require(`./fields/tags`).default,
  radiogroup: require(`./fields/radiogroup`).default,
  image: require(`./fields/image`).default,
  hidden: require(`./fields/hidden`).default,
  country: require(`./fields/country`).default,
  range: require(`./fields/range`).default,
  color: require(`./fields/color`).default,
}

@styled`
margin-bottom: 10px;
  input[type=email],
  input[type=text],
  input[type=search],
  input[type=password],
  input[type=number],
  .DayPickerInput input,
  textarea,
  .select{
    box-sizing: border-box;
    color: ${t(`text`)};
    font-family: ${t(`font`)};
    text-transform: none;
    width: 100%;
    font-size: 0.9em;
    padding: 10px 10px 9px;
    background-color: transparent;
    border: 1px solid ${t(`border`)};
    height: 48px;
    line-height: 28px;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
    background: white;
    -webkit-appearance: none;
    &:focus {
      border: 1px solid ${t(`primary`)};
      outline: none;
    }

    ${({ compact }) => {
  if (compact) {
    return `
        height: 36px;
        padding: 6px;
    `
  }
}}
  }

  .DayPickerInput { display: block; }
  .select{
    background-image: url(${dropdown});
    background-size: 10px;
    background-position: 98% 50%;
    background-repeat: no-repeat;
  }

  textarea {
    height: 100px;
  }
  .validation-error {
    color: ${t(`error`)};
    font-size: 0.8em;
    display: block;
    text-align: right;
    font-weight: 600;
  }
  .description {
    margin: 0;
    font-size: 0.9em;
    font-weight: 600;
    color: ${t(`lightText`)};
  }
  label {
    color: ${t(`lightText`)};
    font-weight: 600;
  }




`
export default class Input extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }

  getType(type) {
    return FIELD_TYPES[type] || FIELD_TYPES.text
  }

  renderErrors() {
    const { errors } = this.props
    if (errors) {
      return (
        errors.map(
          (err, index) => <span key={`inputError${index}`} className="validation-error">{err}</span>
        )
      )
    }
  }

  render() {
    const { className, label, type, description } = this.props
    const Field = this.getType(type)
    const props = { ...this.props }
    delete props.errors
    delete props.theme

    if (label) {
      return (
        <div className={className}>
          {this.renderErrors()}
          <label>
            {label}
            <Field {...props} className="field" />
            <p className="description">{description}</p>
          </label>
        </div>
      )
    }
    return (
      <div className={this.props.className}>
        {this.renderErrors()}
        <Field {...props} className="field" />
        <p className="description">{description}</p>
      </div>
    )
  }

}

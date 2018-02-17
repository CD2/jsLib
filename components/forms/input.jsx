import React from "react"
import PropTypes from "prop-types"
import dropdown from "images/dropdown.svg"
import { styled, t } from "lib/utils/theme"
import loader from "./loader"

const FIELD_TYPES = {
  text: require(`./fields/text`).default,
  textarea: require(`./fields/textarea`).default,
  rich_text: require(`./fields/rich_text_box`).default,
  password_with_help: require(`./fields/password_with_help`).default,
  select: require(`./fields/select`).default,
  checkbox: require(`./fields/checkbox`).default,
  tags: require(`./fields/tags`).default,
  radiogroup: require(`./fields/radiogroup`).default,
  image: require(`./fields/image`).default,
  hidden: require(`./fields/hidden`).default,
  country: require(`./fields/country`).default,
  range: require(`./fields/range`).default,
  file: require(`./fields/file`).default,
}

@styled`
position: relative;
margin-bottom: 10px;
  input[type=email],
  input[type=text],
  input[type=search],
  input[type=password],
  input[type=number],
  .DayPickerInput input,
  textarea,
  .select{
    display: inline-block;
    max-width: auto;
    min-width: 75px;
    vertical-align: baseline;
    width: auto;
    height: auto;
    margin: 0;
    border: 1px solid #95a7b7;
    border-style: inset;
    color: #000000;
    cursor: pointer;
    padding: 8px 10px;
    border: 1px solid #c4cdd5;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    text-transform: initial;
    letter-spacing: initial;
    box-sizing: border-box;
    display: block;
    width: 100%;
    transition: 0.2s;
    box-shadow: inset 0 1px 0 0 rgba(63,63,68,0.05);
    border-color: #c4cdd5;
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
  .DayPickerInput-OverlayWrapper {
    z-index: 40000;
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

  }
  .validation-errors {
      position: absolute;
    bottom: 6px;
    right: 6px;
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

  &.errors { 
    label { color: ${t(`error`)}; }
      input[type=email],
  input[type=text],
  input[type=search],
  input[type=password],
  input[type=number],
  .DayPickerInput input,
  textarea,
  .select{
    border: 1px solid ${t(`error`)} 
  }
  }

.field--nested {
    margin: 12px 0;
}
`
export default class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    loader: PropTypes.object,
    name: PropTypes.string,
    type: PropTypes.string,
  }

  static defaultProps = {
    loader: null,
  }

  componentWillMount() {
    const field = FIELD_TYPES[this.props.type] || FIELD_TYPES.text

    this.field = this.props.loader ? loader(field, this.props.loader) : field
  }

  renderErrors() {
    const { errors } = this.props
    if (errors) {
      return (
        <div className="validation-errors">
          {errors.map((err, index) => (
            <span key={`inputError${index}`} className="validation-error">
              {err}
            </span>
          ))}
        </div>
      )
    }
  }

  renderLoader = field => {
    return loader(field, this.props.loader)
  }

  render() {
    const { className, label, type, description, errors } = this.props
    const hasErrors = !!errors
    const props = { ...this.props }
    delete props.errors
    delete props.theme

    if (type === `hidden`) return <this.field {...props} className="field" />
    if (label) {
      return (
        <div className={`${className} form-input${hasErrors ? ` errors` : ``}`}>
          {this.renderErrors()}
          <label>
            {label}
            <this.field {...props} className="field" />
            <p className="description">{description}</p>
          </label>
        </div>
      )
    }
    return (
      <div className={`${className} form-input`}>
        {this.renderErrors()}
        <this.field {...props} className="field" />
        <p className="description">{description}</p>
      </div>
    )
  }
}

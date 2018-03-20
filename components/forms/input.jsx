import React from "react"
import PropTypes from "prop-types"

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

export default class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    errors: PropTypes.arrayOf(PropTypes.string),
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
  }

  componentWillMount() {
    const field = FIELD_TYPES[this.props.type] || FIELD_TYPES.text

    this.field = field
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

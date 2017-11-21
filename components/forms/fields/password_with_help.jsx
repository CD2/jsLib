import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'lib/utils/theme'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import Wrapper from "../../wrapper"
@styled`
  position: relative;
  text-align: right;
  .field {
    margin-bottom: 10px;
  }
  .password_helpers {
    display: inline-block;
    font-size: 0.9em;
    text-align: left;
    font-weight: 600;
    ul{
      padding: 0;
      margin: 0;
      list-style: none;   
    }   
    .error {
      color: ${t(`lightText`)}
    }
    .complete {
      color: ${t(`primary`)}
    }
  }
`
@observer
export class PasswordWithHelpField extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    description: PropTypes.string,
    initialValue: PropTypes.string,
    label: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.bool,
    ]),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
  }

  constructor(props) {
    super(props)

    const rand = Math.random()
    this.id = `${rand}_field`
    this.confirmation_id = `${rand}_confirmation_field`
  }
  @observable value = this.props.initialValue || ``
  @observable errors = []
  @observable confirmation_errors = []
  @observable confirmation_value = ``
  @observable helper_errors = false

  getValue() {
    return this.value
  }

  getConfirmationValue() {
    return this.confirmation_value
  }

  updateForm() {
    const name=`password`
    const value = this.valid() ? this.value : ``
    this.props.onChange({ name, value })
  }

  handleChange = (e) => {
    this.value =  e.target.value
    this.updateForm()
  }

  handleConfirmationChange = (e) => {
    this.confirmation_value = e.target.value
    this.updateForm()
  }

  valid() {
    const errors = []
    const confirmation_errors = []
    let helper_errors = false

    if (this.value === ``) {
      errors.push(`cant be blank`)
    }

    Object.values(this.helpers).forEach(tester => {
      if (!tester(this.value)) helper_errors = true
    })

    if (this.value !== this.confirmation_value) {
      confirmation_errors.push(`must match`)
    }

    this.helper_errors = helper_errors
    this.errors = errors
    this.confirmation_errors = confirmation_errors
    return !helper_errors && errors.length === 0 && confirmation_errors.length === 0
  }

  getErrors() {
    return this.errors
  }

  getConfirmationErrors() {
    return this.confirmation_errors
  }

  hasErrors() {
    return this.getErrors().length > 0
  }

  hasConfirmationErrors() {
    return this.getConfirmationErrors().length > 0
  }

  getErrorMessages() {
    const display_name = `Password`
    return this.getErrors().map((error, i) => {
      return (
        <div key={i} className="field__error-message"> {display_name} {error}</div>
      )
    })
  }

  getConfirmationErrorMessages() {
    return this.getConfirmationErrors().map((error, i) => {
      return (
        <div key={i} className="field__error-message">Password Confirmation {error}</div>
      )
    })
  }

  getFieldClassName() {
    let className = `field ${this.props.className}`
    if (this.hasErrors()) className += ` field__with-errors`
    return className
  }

  getConfirmationFieldClassName() {
    let className = `field--nested`
    if (this.hasConfirmationErrors()) className += ` field__with-errors`
    return className
  }

  renderHelp(text, tester) {
    let className = ``
    if (tester(this.getValue())) {
      className += `complete`
    } else if (this.helper_errors) {
      className += `error`
    }
    return (
      <li key={text} className={className}>{text}</li>
    )
  }

  helpers = {
    'At least 8 characters long': value => value.length>=8,
    'Contains a lowercase letter': value => /[a-z]/.test(value),
    'Contains an uppercase letter': value => /[A-Z]/.test(value),
    'Contains a number': value => /[0-9]/.test(value),
  }

  renderHelpers() {
    const helperComponents = Object.entries(this.helpers).map(([text, tester]) => {
      return this.renderHelp(text, tester)
    })

    let className = ``
    if (this.getValue() && this.getValue() === this.getConfirmationValue()) {
      className += `complete`
    } else if (this.helper_errors) {
      className += `error`
    }

    return (
      <Wrapper className="password_helpers" background={`#f5f5f5`}>
        <ul>
          {helperComponents}
          <li className={className}>Password confirmation must match</li>
        </ul>
      </Wrapper>
    )
  }

  render() {
    return (
      <div className={this.getFieldClassName()}>
        {this.getErrorMessages()}
        <input
          className="field"
          type="password"
          value={this.getValue()}
          placeholder={this.props.placeholder}
          onChange={this.handleChange}
        />
        <div className={this.getConfirmationFieldClassName()}>
          <input
            className="field"
            type="password"
            value={this.getConfirmationValue()}
            placeholder="Password Confirmation"
            onChange={this.handleConfirmationChange}
          />
        </div>
        {this.renderHelpers()}
      </div>
    )
  }

}
export default PasswordWithHelpField
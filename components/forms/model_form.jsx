import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'

import { titleCase } from 'utils/helpers'

import Model from './form_model'
import Form from './form'
import Submit from './submit'
import Input from './model_input'
import decorate from 'utils/decorate'

class ModelForm extends React.Component {

  static propTypes = {
    fields: PropTypes.array,
    fieldsAsObject: PropTypes.bool,
    model: PropTypes.object,
    modelOptions: PropTypes.shape({
      values: PropTypes.object,
      cord: PropTypes.object,
      perform: PropTypes.string,
      redirectTo: PropTypes.func,
      formatPayload: PropTypes.func,
      flash: PropTypes.string,
      onSubmit: PropTypes.func,
      onSuccess: PropTypes.func,
      onError: PropTypes.func,
    }),
    onSubmit: PropTypes.func,
    renderContents: PropTypes.func,
    renderField: PropTypes.func,
    submit: PropTypes.node,
  }

  static defaultProps = {
    fieldsAsObject: false,
    model: null,
    modelOptions: {},
    preventDefault: true,
    renderContents: null,
    renderField: null,
    submit: <Submit />,
  }

  constructor(props) {
    super()

    const ModelType = props.model || Model

    this.model = new ModelType({
      fields: props.fields,
      options: {
        ...props.modelOptions,
        onSuccess: () => {
          props.modelOptions.onSuccess && props.modelOptions.onSuccess()
          this.stopSubmitting()
        },
        onError: () => {
          props.modelOptions.onError && props.modelOptions.onError()
          this.stopSubmitting()
        },
      },
    })
  }

  @observable formSubmitting = false

  @action handleSubmit  = () => {
    this.formSubmitting = true
    const { onSubmit } = this.props

    if (onSubmit) return onSubmit(this.model)

    return this.model.submit()
  }

  @action stopSubmitting = () => this.formSubmitting = false

  renderField = (field, index) => {
    const inputComponent = (
      <Input
        key={index}
        model={this.model}
        label={field.label || titleCase(field.name)}
        {...field}
      />
    )

    if (this.props.renderField) {
      return this.props.renderField(inputComponent, this.model, field, index)
    }

    return inputComponent
  }

  renderFields() {
    if (this.props.fieldsAsObject) {
      return this.props.fields.reduce((fields, field, index) => {
        fields[field.name] = this.renderField(field, index)

        return fields
      }, {})
    }

    return this.props.fields.map(this.renderField)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          this.props.renderContents
            ? this.props.renderContents(this.renderFields(), this.model)
            : this.renderFields()
        }
        {React.cloneElement(
          this.props.submit,
          { ...this.props.submit.props, submitting: this.formSubmitting }
        )}
      </Form>
    )
  }

}

export default decorate(
  observer,
  ModelForm
)

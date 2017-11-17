import React from 'react'
import PropTypes from 'prop-types'

import Model from './model'
import Form from './form'
import Submit from './submit'
import Input from './model_input'

export default class ModelForm extends React.Component {

  static propTypes = {
    fields: PropTypes.array,
    fieldsAsObject: PropTypes.bool,
    model: PropTypes.object,
    modelOptions: PropTypes.object,
    onSubmit: PropTypes.func,
    renderContents: PropTypes.func,
    renderField: PropTypes.func,
    submit: PropTypes.node,
    values: PropTypes.object,
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
      validations: props.fields.map(field => field.validation),
      values: props.values,
      ...props.modelOptions
    })
  }

  renderField = (field, index) => {
    const inputComponent = (
      <Input
        key={index}
        model={this.model}
        {...field}
      />
    )

    if (this.props.renderField) return this.props.renderField(inputComponent, this.model, field, index)

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
      <Form onSubmit={this.props.onSubmit}>
        {
          this.props.renderContents
            ? this.props.renderContents(this.renderFields(), this.model)
            : this.renderFields()
        }
        {this.props.submit}
      </Form>
    )
  }

}

const validators_types = {
  presence: require(`./validators/presence`).default,
  acceptance: require(`./validators/acceptance`).default,
  format: require(`./validators/format`).default,
}

function validateForm(values, validations) {
  const errors = {}
  const addError = (field, msg) => errors[field] = (errors[field] || []).concat([msg])

  Object.entries(validations).map(([fieldname, validators]) => {
    const value = values.has(fieldname) ? values.get(fieldname) : ``
    Object.entries(validators).map(([validator_name, options]) => {
      const validator_class = validators_types[validator_name]
      if (!validator_class) throw new Error(`unknown validator ${validator_name}`)
      if (options === true) options = {}
      const validator = new validator_class(options)
      if (!validator.validate(value)) addError(fieldname, validator.message())
    })
  })
  return errors
}


export default validateForm

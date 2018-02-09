import decorate from "lib/utils/decorate"

export default function inputLoader(Component, options) {
  switch (options.type) {
    case `records`: {
      return decorate(
        options.cord.connectIds(options.scope || `all`),
        options.cord.connectRecord({
          id: props => {
            if (options.scope) {
              props[`${options.scope}_ids`]
            } else if (options.ids) {
              return options.ids
            }

            return props.all_ids
          },
          as: options.as || `records`,
          attributes: options.attributes || [],
          formatter: options.formatter,
        }),
        Component,
      )
    }
    case `record`: {
      return decorate(
        options.cord.connectRecord({
          condition: props =>
            options.condition ? options.condition(props) : true,
          id: props => props.id,
          as: options.as || `record`,
          attributes: options.attributes || [],
          formatter: options.formatter,
        }),
        Component,
      )
    }
    case `ids`: {
      return decorate(
        options.cord.connectIds(options.scope || options.scopes || `all`),
        Component,
      )
    }
    case `fields`: {
      return decorate(
        options.cord.connectFields({
          as: options.as || `records`,
          fields: options.fields || [],
          scope: options.scope || `all`,
          formatter: options.formatter,
        }),
        Component,
      )
    }
    default:
      return Component
  }
}

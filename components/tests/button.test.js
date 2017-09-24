import t from 'utils/test_helper'

import { Button } from '../button'

t.describe_component(Button, {}, (c) => {
  describe(`proptypes`, () => {
    c.accepts_prop(`className`)
    c.accepts_prop(`to`)
    c.accepts_prop(`external`)
    c.accepts_prop(`buttonStyle`)
    c.accepts_prop(`onClick`)
    c.accepts_prop(`children`)
    c.accepts_prop(`target`)
  })

  describe(`render`, () => {
    c.with_props({ className: `button_class`, to: `/somehref`, external: true }, (c) => {
      c.has_css(`a`).with_attr(`href`, `/somehref`)
    })
    c.with_props({ className: `button_class` }, (c) => {
      c.has_css(`.btn`)
    })
  })
})

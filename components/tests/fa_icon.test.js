import t from 'utils/test_helper'

import { FaIcon } from '../fa_icon'

t.describe_component(FaIcon, { icon:`test_icon`, className:`test` }, (c) => {
  describe(`proptypes`, () => {
    c.accepts_prop(`icon`)
    c.accepts_prop(`hoverColor`)
    c.accepts_prop(`color`)
    c.accepts_prop(`size`)
  })

  c.has_css(`i`)
})

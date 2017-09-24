import t from 'utils/test_helper'

import { Img } from '../img'

t.describe_component(Img, { alt: `test_alt` }, (c) => {
  c.accepts_prop(`alt`)

  c.has_css(`img`).with_attr(`alt`, `test_alt`)
})

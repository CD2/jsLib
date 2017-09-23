import t from 'utils/test_helper'

import { Breadcrumbs } from '../breadcrumbs'

t.describe_component(Breadcrumbs, { theme:{ secondary:`tst` }, breadcrumbs:[{ name:`test1`, href:`/href1` }] }, (c) => {
  c.accepts_prop(`breadcrumbs`)

  c.has_css(`Wrapper`).with_attr(`background`).has_css(`Grid`, (c) => {
    c.has_css(`GridItem`).with_attr(`weight`, 5/6).has_css(`span`).has_css(`a`, (c) => {
      c.with_attr(`className`, `breadcrumb__link`)
      c.has_css(`img`).with_attr(`src`)
    })
  })
  c.has_link({ href: `/href1`, text: `test1` })
  c.has_css(`GridItem`).with_attr(`weight`, 1/6).has_css(`a`).with_attr(`onClick`)

})

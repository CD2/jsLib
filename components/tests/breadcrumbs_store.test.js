import t from 'utils/test_helper'
import BreadcrumbStore from 'stores/breadcrumbs'
import { Breadcrumbs } from '../breadcrumbs_store'

t.describe_component(Breadcrumbs, { theme: { secondary: 1 }}, (c) => {
  c.call_function(`renderBreadcrumb`, { name: ``, href: `` })
  BreadcrumbStore.set(1,{ name: `b`, href: `/1` })
  c.has_css(`Wrapper`).has_css(`Grid`, (c) => {
    c.has_css(`GridItem`).with_attr(`weight`, 5/6).has_css(`span`, (c) => {
      c.has_css(`a`).with_attr(`className`, `breadcrumb__link`)
    })
    c.has_css(`GridItem`).with_attr(`align`, `right`).with_attr(`weight`, 1/6)
  })
})

import t from 'utils/test_helper'

import { PaginationControls } from '../pagination_controls'

t.describe_component(PaginationControls, { page:1, per_page:2, total_records:10, onPageChange:() => {} }, (c) => {
  describe(`propTypes`, () => {
    c.accepts_prop(`page`)
    c.accepts_prop(`per_page`)
    c.accepts_prop(`total_records`)
    c.accepts_prop(`onPageChange`)
  })

  describe(`functions`, () => {
    c.call_function(`changePage`, 10)
    c.call_function(`totalPages`).expect_return_to_eq(5)
    describe(`first page`, () => {
      c.call_function(`firstPage`).expect_return_to_eq(true)
      c.with_props({ 'page': 2 }, (c) => {
        c.call_function(`firstPage`).expect_return_to_eq(false)
      })
    })
    describe(`lastPage`, () => {
      c.with_props({ 'page': 5 }, (c) => {
        c.call_function(`lastPage`).expect_return_to_eq(true)
      })
      c.with_props({ 'page': 2 }, (c) => {
        c.call_function(`lastPage`).expect_return_to_eq(false)
      })
    })
  })

  describe(`render`, () => {
    describe(`Left`, () => {
      c.with_props({ 'page': 2 }, (c) => {
        c.has_css(`div`).with_text(`‹ Left`)
      })
    })
    describe(`Right`, () => {
      c.has_css(`div`).with_text(`Right ›`)
    })

    describe(`PageNumbers`, () => {
      c.has_css(`div`).with_text(`1`)
      c.has_css(`div`).with_text(`2`)
      c.has_css(`div`).with_text(`3`)
      c.has_css(`div`).with_text(`4`)
      c.has_css(`div`).with_text(`5`)
    })
  })

})

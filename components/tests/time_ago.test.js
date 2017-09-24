import t from 'utils/test_helper'

import { TimeAgo } from '../time_ago'

t.describe_component(TimeAgo, { time: new Date() }, (c) => {
  describe(`proptypes`, () => {
    c.accepts_prop(`time`)
  })
  describe(`expecting seconds`, () => {
    c.call_function(`getInterval`).expect_return_to_eq(5000)
    c.call_function(`timeout`)
    c.expect_state({ displayTime: `a few seconds ago` })
    c.has_css(`span`).with_text(`a few seconds ago`)
  })

  describe(`expecting minutes`, () => {
    c.with_props({ time: new Date(Date.now() - 60100) }, (c) => {
      c.call_function(`getInterval`).expect_return_to_eq(15000)
      c.call_function(`timeout`)
      c.expect_state({ displayTime: `a minute ago` })
      c.has_css(`span`).with_text(`a minute ago`)
    })
  })
  describe(`expecting hours`, () => {
    c.with_props({ time: new Date(Date.now() - 6001100) }, (c) => {
      c.call_function(`getInterval`).expect_return_to_eq(900000)
      c.call_function(`timeout`)
      c.expect_state({ displayTime: `2 hours ago` })
      c.has_css(`span`).with_text(`2 hours ago`)
    })
  })
})

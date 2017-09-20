import t from 'utils/test_helper'

import {Overlay} from '../overlay';

t.describe_component(Overlay, {onClick:() => {}, visible:true, className:'test'}, (c) => {
  describe('proptypes', () => {
    c.accepts_prop('onClick')
    c.accepts_prop('visible')
    c.accepts_prop('className')
  })
  c.has_css('.test .visible')
})

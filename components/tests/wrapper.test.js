import t from 'utils/test_helper'

import {Wrapper} from '../wrapper';

t.describe_component(Wrapper, {theme:{siteWidth:10}, width:10, overlay:'tst'}, (c) => {
  describe('proptypes', () => {
    c.accepts_prop('width')
    c.accepts_prop('background')
    c.accepts_prop('innerBackground')
    c.accepts_prop('backgroundImage')
    c.accepts_prop('overlay')
    c.accepts_prop('spacing')
    c.accepts_prop('gutter')
    c.accepts_prop('wide')
  })
  describe('render', () => {
    c.has_css('div').with_attr('className', 'wrapper__overlay')
    c.has_css('div').with_attr('className', 'wrapper__inner')
  })

})

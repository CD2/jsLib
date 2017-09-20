import t from 'utils/test_helper'

import {DateTime} from '../date_time';

t.describe_component(DateTime, {}, (c) => {
  c.accepts_prop('date')
  c.accepts_prop('format')
  c.has_css('span')
})

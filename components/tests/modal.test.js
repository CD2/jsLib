import t from 'utils/test_helper'

import { Modal } from '../modal'

t.describe_component(Modal, { children: [] }, (c) => {
  c.has_css(`div`).has_css(`div`).with_attr(`className`, `modal`)
  c.has_css(`Overlay`).with_attr(`visible`)
})

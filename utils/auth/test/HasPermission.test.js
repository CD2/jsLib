/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { HasPermission } from '../../../has_permission'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<HasPermission />`, () => {
  const view = shallow((
    <HasPermission />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
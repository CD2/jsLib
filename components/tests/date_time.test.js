/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { DateTime } from '../date_time'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<DateTime />`, () => {
  const view = shallow((
    <DateTime />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
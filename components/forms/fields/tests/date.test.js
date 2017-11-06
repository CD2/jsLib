/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { date } from '../date'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<date />`, () => {
  const view = shallow((
    <date />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
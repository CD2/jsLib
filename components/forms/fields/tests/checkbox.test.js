/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<checkbox />`, () => {
  const view = shallow((
    <xheckbox />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
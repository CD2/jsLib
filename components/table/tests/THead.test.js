/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { THead } from '../THead'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<THead />`, () => {
  const view = shallow((
    <THead />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
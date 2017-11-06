/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { ListSeparator } from '../lsit_separator'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<ListSeparator />`, () => {
  const view = shallow((
    <ListSeparator />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
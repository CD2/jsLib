/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { List } from '../list'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<List />`, () => {
  const view = shallow((
    <List />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
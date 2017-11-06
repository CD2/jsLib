/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TagField } from '../tags'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<TagField />`, () => {
  const view = shallow((
    <TagField />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
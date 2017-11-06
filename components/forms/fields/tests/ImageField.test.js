/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { ImageField } from '../image'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<ImageField />`, () => {
  const view = shallow((
    <ImageField />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
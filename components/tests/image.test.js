/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Image } from '../image'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<Image />`, () => {
  const view = shallow((
    <Image />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
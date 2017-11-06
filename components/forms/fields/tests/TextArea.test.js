/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TextArea } from '../textarea'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<TextArea />`, () => {
  const view = shallow((
    <TextArea />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
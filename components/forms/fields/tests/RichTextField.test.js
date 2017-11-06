/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { RichTextBox } from '../rich_text_field'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<RichTextBox />`, () => {
  const view = shallow((
    <RichTextBox />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
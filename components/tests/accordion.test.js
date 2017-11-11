/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Accordion } from '../accordion'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<Accordion />`, () => {
  const view = shallow((
    <Accordion />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
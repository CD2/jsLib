/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Overlay } from '../overlay'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<Overlay />`, () => {
  const view = shallow((
    <Overlay />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
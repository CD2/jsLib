/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { faIcon } from '../fa_icon'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<faIcon />`, () => {
  const view = shallow((
    <faIcon />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
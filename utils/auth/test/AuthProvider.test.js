/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { AuthProvider } from '../../../provider'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<AuthProvider />`, () => {
  const view = shallow((
    <AuthProvider />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
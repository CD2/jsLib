/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { AuthSwitch } from '../../../auth_switch'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<AuthSwitch />`, () => {
  const view = shallow((
    <AuthSwitch />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
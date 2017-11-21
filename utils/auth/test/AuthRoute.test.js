/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { AuthRoute } from '../../../auth_route'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<AuthRoute />`, () => {
  const view = shallow((
    <AuthRoute />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
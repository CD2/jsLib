/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { AuthNavLink } from '../../../auth_nav_link'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<AuthNavLink />`, () => {
  const view = shallow((
    <AuthNavLink />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
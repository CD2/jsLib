/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { AuthLink } from '../../../auth_link'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<AuthLink />`, () => {
  const view = shallow((
    <AuthLink />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { withAuth } from '../../../with_auth'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<withAuth />`, () => {
  const view = shallow((
    <withAuth />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
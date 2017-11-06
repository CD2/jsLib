/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { EmailValidator } from '../email'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<EmailValidator />`, () => {
  const view = shallow((
    <EmailValidator />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { LinkOrDiv } from '../link_or_div'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<LinkOrDiv />`, () => {
  const view = shallow((
    <LinkOrDiv />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
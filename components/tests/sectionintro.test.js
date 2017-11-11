/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { SectionIntro } from '../SectionIntro'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<SectionIntro />`, () => {
  const view = shallow((
    <SectionIntro />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
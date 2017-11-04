/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Wrapper } from '../wrapper'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<Wrapper />`, () => {
  const wrapper = shallow((
    <Wrapper theme={{ siteWidth: 1 }}>
      <div className="unique" />
    </Wrapper>
  ))

  const wrapperWithBg = shallow((
    <Wrapper theme={{ siteWidth: 1 }} backgroundImageUid={`xxx`} />
  ))

  const wrapperWithOverlay = shallow((
    <Wrapper theme={{ siteWidth: 1 }} overlay={`green`} />
  ))

  it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())
  it(`snapshot`, ()=>expect(toJson(wrapperWithBg)).toMatchSnapshot())
  it(`snapshot`, ()=>expect(toJson(wrapperWithOverlay)).toMatchSnapshot())

  it(`should render children when passed in`, () => {
    expect(wrapper.contains(<div className="unique" />)).toBe(true)
  })
})
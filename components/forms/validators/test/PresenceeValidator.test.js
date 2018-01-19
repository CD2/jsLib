/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { PresenceValidator } from "../presence"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<PresenceValidator />`, () => {
  const view = shallow(<PresenceValidator />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

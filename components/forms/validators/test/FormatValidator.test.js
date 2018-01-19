/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { FormatValidator } from "../format"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<FormatValidator />`, () => {
  const view = shallow(<FormatValidator />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

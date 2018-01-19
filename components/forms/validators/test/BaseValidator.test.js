/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { BaseValidator } from "../base"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<BaseValidator />`, () => {
  const view = shallow(<BaseValidator />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

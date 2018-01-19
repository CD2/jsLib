/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { TextField } from "../text"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<TextField />`, () => {
  const view = shallow(<TextField />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

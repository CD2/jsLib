/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Button } from "../button"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<Button />`, () => {
  const view = shallow(<Button />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

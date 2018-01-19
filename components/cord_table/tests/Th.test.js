/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Th } from "../Th"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<Th />`, () => {
  const view = shallow(<Th />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

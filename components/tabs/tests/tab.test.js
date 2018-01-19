/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Tab } from "../tab"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<Tab />`, () => {
  const view = shallow(<Tab />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

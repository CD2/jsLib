/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { SelectField } from "../select"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<SelectField />`, () => {
  const view = shallow(<SelectField />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

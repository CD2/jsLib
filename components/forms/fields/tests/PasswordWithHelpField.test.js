/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { PasswordWithHelpField } from "../password_with_help"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<PasswordWithHelpField />`, () => {
  const view = shallow(<PasswordWithHelpField />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

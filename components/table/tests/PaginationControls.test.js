/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { PaginationControls } from "../pagination_controls"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<PaginationControls />`, () => {
  const view = shallow(<PaginationControls />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

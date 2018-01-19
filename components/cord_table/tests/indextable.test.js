/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { IndexTable } from "../Table"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<IndexTable />`, () => {
  const view = shallow(<IndexTable />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

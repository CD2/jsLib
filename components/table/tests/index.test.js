/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Table } from "../index"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<Table />`, () => {
  const view = shallow(<Table />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

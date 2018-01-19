/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { GridItem } from "../item"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<GridItem />`, () => {
  const view = shallow(<GridItem />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { ListItem } from "../list_item"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<ListItem />`, () => {
  const view = shallow(<ListItem />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

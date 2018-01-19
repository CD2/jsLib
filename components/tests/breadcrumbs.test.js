/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { Breadcrumbs } from "../breadcrumbs"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<Breadcrumbs />`, () => {
  const view = shallow(<Breadcrumbs />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

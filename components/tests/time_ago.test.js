/* eslint-disable react/jsx-filename-extension */
import React from "react"
import { TimeAgo } from "../time_ago"
import { shallow } from "enzyme"
import toJson from "enzyme-to-json"

describe(`<TimeAgo />`, () => {
  const view = shallow(<TimeAgo />)

  it(`snapshot`, () => expect(toJson(view)).toMatchSnapshot())
})

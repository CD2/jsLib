/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Grid } from '../index'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<Grid />`, () => {
  const view = shallow((
    <Grid />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Grid } from '../index'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Grid />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

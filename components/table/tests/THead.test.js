/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { THead } from '../THead'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<THead />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

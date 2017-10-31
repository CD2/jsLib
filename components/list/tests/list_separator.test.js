/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { ListSeparator } from '../lsit_separator'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<ListSeparator />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

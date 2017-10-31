/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { checkbox } from '../checkbox'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<checkbox />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

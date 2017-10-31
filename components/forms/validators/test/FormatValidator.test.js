/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { FormatValidator } from '../format'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<FormatValidator />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

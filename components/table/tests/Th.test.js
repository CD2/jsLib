/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Th } from '../Th'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Th />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

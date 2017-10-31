/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { date } from '../date'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<date />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

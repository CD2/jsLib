/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { IndexQuery } from '../IndexQuery'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<IndexQuery />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

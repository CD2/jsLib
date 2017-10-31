/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { IndexFilters } from '../IndexFilters'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<IndexFilters />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

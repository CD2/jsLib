/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TableFilter } from '../Filter'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<TableFilter />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

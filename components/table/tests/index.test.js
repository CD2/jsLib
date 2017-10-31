/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Table } from '../index'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Table />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

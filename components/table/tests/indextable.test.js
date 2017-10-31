/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { IndexTable } from '../Table'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<IndexTable />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

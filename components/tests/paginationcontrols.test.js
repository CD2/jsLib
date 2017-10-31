/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { PaginationControls } from '../pagination_controls'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<PaginationControls />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

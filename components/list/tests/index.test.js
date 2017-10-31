/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { List } from '../index'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<List />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

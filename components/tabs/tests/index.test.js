/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Tabs } from '../index'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Tabs />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

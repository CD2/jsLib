/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Tab } from '../tab'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Tab />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

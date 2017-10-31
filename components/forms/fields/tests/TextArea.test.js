/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TextArea } from '../textarea'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<TextArea />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

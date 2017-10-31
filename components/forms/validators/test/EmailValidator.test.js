/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { EmailValidator } from '../email'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<EmailValidator />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

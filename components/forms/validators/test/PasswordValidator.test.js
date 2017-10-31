/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { PasswordValidator } from '../password'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<PasswordValidator />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { PresenceValidator } from '../presence'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<PresenceValidator />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

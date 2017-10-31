/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TextField } from '../hidden'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<TextField />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

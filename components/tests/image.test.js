/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Image } from '../Image'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Image />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

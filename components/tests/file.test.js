/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { File } from '../file'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<File />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

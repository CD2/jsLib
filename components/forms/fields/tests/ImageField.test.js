/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { ImageField } from '../image'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<ImageField />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

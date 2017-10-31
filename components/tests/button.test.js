/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Button } from '../button'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Button />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Overlay } from '../overlay'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Overlay />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

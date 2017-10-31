/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Modal } from '../modal'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Modal />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

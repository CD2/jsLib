/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { faIcon } from '../fa_icon'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<faIcon />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TagField } from '../tags'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<TagField />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

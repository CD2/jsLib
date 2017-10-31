/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { SelectField } from '../radiogroup'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<SelectField />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

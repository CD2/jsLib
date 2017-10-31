/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { GridItem } from '../item'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<GridItem />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

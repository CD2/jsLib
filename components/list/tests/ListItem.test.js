/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { ListItem } from '../list_item'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<ListItem />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

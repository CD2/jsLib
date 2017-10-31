/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { LinkOrDiv } from '../link_or_div'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<LinkOrDiv />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

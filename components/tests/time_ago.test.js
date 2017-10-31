/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { TimeAgo } from '../time_ago'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<TimeAgo />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

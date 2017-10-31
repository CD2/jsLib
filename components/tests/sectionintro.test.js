/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { SectionIntro } from '../SectionIntro'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<SectionIntro />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

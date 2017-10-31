/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { RichTextBox } from '../rich_text_field'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<RichTextBox />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

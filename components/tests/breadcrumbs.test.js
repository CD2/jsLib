import React from 'react'
import { Breadcrumbs } from '../breadcrumbs'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

const wrapper = shallow(<Breadcrumbs />)
it(`snapshot`, ()=>expect(toJson(wrapper)).toMatchSnapshot())

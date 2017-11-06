/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Modal } from '../modal'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe(`<Modal />`, () => {
  const view = shallow((
    <Modal />
  ))

  it(`snapshot`, ()=>expect(toJson(view)).toMatchSnapshot())
})
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import theme from 'styles/theme'
import { Provider as ThemeProvider } from 'lib/utils/theme'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import FunctionTester from './function_tester'
import ElementTester from './element_tester'
import InputTester from './input_tester'
import { Provider as CordProvider } from 'lib/utils/cord'
import cord_store from 'lib/utils/cord_store'

export class ComponentTest {

  constructor(Component, props, callback) {
    this.Component = Component
    this.props = props
    describe(`Component <${Component.name} />`, ()=>{
      this.snapshot()
      callback.call(null, this)
    })
  }

  _getHistory() {
    if (this._history === undefined) this._history = createMemoryHistory()
    return this._history
  }

  _getWrapper() {
    if (this._wrapper === undefined) {
      this._wrapper = shallow(
        <CordProvider store={cord_store}>
          <Router history={this._getHistory()}>
            <ThemeProvider theme={theme}>
              <this.Component {...this.props} />
            </ThemeProvider>
          </Router>
        </CordProvider>
      ).find(this.Component).first().dive()
    }
    return this._wrapper
  }

  _getInstance(){
    if (this._instance === undefined){
      this._instance = new this.Component(this.props)

      this._instance.setState = (args) => {
        const state = this._instance.state
        this._instance.state = typeof args === `function`
          ? { ...state, ...args(state) }
          : { ...state, ...args }
      }
    }
    return this._instance
  }

  snapshot() {
    it(`renders correctly`, () => expect(toJson(this._getWrapper())).toMatchSnapshot())
  }

  has_link({ href, text }={}) {
    if (href===undefined) throw new Error(`href is required`)
    describe(`has a link`, ()=>{
      let selector = `a`
      if (href) selector += `[href="${href}"]`
      const link = this._getWrapper().find(selector)
      it(`with a href of ${href}`, () => expect(link.length).toBe(1))
      if (text) it(`with text "${text}"`, () => expect(link.text()).toBe(text))
    })
  }

  has_css(selector, callback) {
    it(`has a ${selector}`, () => {
      const element = this._getWrapper().find(selector)
      expect(element.length).toBeGreaterThan(0)
    })
    const element = this._getWrapper().find(selector)
    const element_tester = new ElementTester(element)
    if (callback) callback.call(undefined, element_tester)
    return element_tester
  }

  accepts_prop(name) {
    if (this.Component.PropTypes){
      console.warn(`Warning: (P)ropTypes being used on:`, this.Component.name)
    } else {
      const propTypes = this.Component.propTypes || {}
      it (`accepts ${name} as a prop`, () => expect(propTypes).toHaveProperty(name))
    }
  }


  pending(text) {
    xit(text)
  }

  has_input(selector, callback=()=>{}) {
    new InputTester(this._getWrapper().find(`Input`), selector, callback)
  }

  with_props(props, callback) {
    return new ComponentTest(this.Component, { ...this.props, ...props }, callback)
  }

  call_function(function_name, ...args){
    return new FunctionTester(this._getInstance(), function_name, args)
  }

  set_state(...args){
    this._getInstance().setState(...args)
  }

  mock_getToken(){
    this._getInstance().getToken
  }

  expect_state(args){
    const state = this._getInstance().state
    it (`has state ${JSON.stringify(args)}`, () => {
      expect(state).toEqual(expect.objectContaining(
        args
      ))
    })
  }

}


//
// describe(`.className`, () => {
//   c.with_props({'className':''}, (c) => {
//     it('with empty string', () => {
//       expect(c._getInstance().className).toEqual('tag')
//     })
//   })
//   c.with_props({'className':null}, (c) => {
//     it('with null', () => {
//       expect(c._getInstance().className).toEqual('tag')
//     })
//   })
//   it('should return without with given className', () => {
//     c._getInstance().selected = false
//     expect(c._getInstance().className).toEqual('tag potato')
//   })
//   it('should return x with given className', () => {
//     c._getInstance().selected = true
//     expect(c._getInstance().className).toEqual('tag potato selected')
//   })
// })
//
// describe('.handleClick', () => {
//   c.with_props({'tag': 'test'}, (c) => {
//     beforeEach(() => {
//       dashboardStore.lessTagsLike = jest.fn()
//       dashboardStore.moreTagsLike = jest.fn()
//     })
//
//     it('moreTagsLike', () => {
//       c._getInstance().selected = false
//       c.call_function(`handleClick`)
//       expect(dashboardStore.lessTagsLike.mock.calls.length).toEqual(0)
//       expect(dashboardStore.moreTagsLike.mock.calls[0]).toEqual(['test'])
//     })
//     it('lessTagsLike', () => {
//       c._getInstance().selected = true
//       c.call_function(`handleClick`)
//       expect(dashboardStore.moreTagsLike.mock.calls.length).toEqual(0)
//       expect(dashboardStore.lessTagsLike.mock.calls[0]).toEqual(['test'])
//     })
//   })
// })
export default ComponentTest

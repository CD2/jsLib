import React from 'react'

import { mount } from 'enzyme'


import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import IntegrationTest from './integration_test'

import ComponentTest from './component_test'

export class SceneTest extends ComponentTest {

  has_routes(routes) {
    describe(`routes`, () => {
      Object.entries(routes).forEach(([route, component]) => {
        it(`should show ${component.name} when route is ${route}`, () => {
          this._getHistory().push(route)
          expect(this._getWrapper().find(component.name).length>0).toBe(true)
        })
      })
    })
  }

  snapshot() {
    console.error(`SNAPSHOTS DONT WORK IN SCENS`)
  }

  routes_404(Component) {
    describe(`a 404`, () => {
      it(`should show ${Component.name} when route is not known`, () => {
        this._getHistory().push(`${Math.random()  }`)
        expect(this._getWrapper().find(Component.name).length>0).toBe(true)
      })
    })
  }

  startAt(url, callback) {
    const intTest = new IntegrationTest(this.Component)
    intTest.goto(url)
    callback.call(undefined, intTest)
  }

}


export function scene_routing(Scene, { base_url, routes }={}) {
  describe(`${Scene.name} routes`, () => {
    beforeEach(() => {
      this.history = createMemoryHistory()
      this.wrapper = mount(
        <Router history={this.history}>
          <Scene />
        </Router>
      )
    })

    Object.entries(routes).forEach(([route, component]) => {
      it(`should show ${component.name} when route is ${route}`, () => {
        this.history.push(base_url + route)
        expect(this.wrapper.find(component.name).length>0).toBe(true)
      })
    })
  })
}
export default SceneTest
import React from "react"

import { mount } from "enzyme"

import { Router } from "react-router-dom"
import { createMemoryHistory } from "history"

export class IntegrationTest {
  constructor(Component, props) {
    this.Component = Component
    this.props = props
  }

  _getHistory() {
    if (this._history === undefined) this._history = createMemoryHistory()
    return this._history
  }

  _getWrapper() {
    if (this._wrapper === undefined) {
      return mount(
        <Router history={this._getHistory()}>
          <this.Component {...this.props} />
        </Router>,
      )
        .find(this.Component)
        .first()
    }
    return this._wrapper
  }

  goto(href) {
    this._getHistory().push(href)
  }

  click_link(text) {
    describe(`a link with text "${text}"`, () => {
      const links = this._getWrapper()
        .find(`a`)
        .filterWhere(elem => elem.text() === text)
      if (links.length > 1) throw new Error(`Multiple links found with text "${text}"`)
      it(`should exist`, () => expect(links.length).toBe(1))
      links.first().simulate(`click`, { button: 0 })
    })
  }

  has_title(title) {
    it(`has title "${title}"`, () => expect(document.title).toBe(title))
  }

  has_path(path) {
    expect(this._getHistory().location.pathname).toBe(path)
  }
}
export default IntegrationTest

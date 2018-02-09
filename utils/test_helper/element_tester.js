export class ElementTester {
  constructor(elements) {
    this.elements = elements
  }

  with_text(text) {
    it(`with text ${text}`, () => {
      this.elements = this.elements.filterWhere(n => n.text() === text)
      expect(this.elements.length).toBeGreaterThan(0)
    })
    return this
  }

  with_attr(name, value) {
    if (value) {
      this.elements = this.elements.filterWhere(n => n.prop(name) === value)
      it(`has an attribute ${name} with value ${value}`, () =>
        expect(this.elements.length).toBeGreaterThan(0))
    } else {
      this.elements = this.elements.filterWhere(n => n.prop(name))
      it(`has an attribute ${name}`, () =>
        expect(this.elements.length).toBeGreaterThan(0))
    }
    return this
  }

  with_style(name, value) {
    if (value) {
      this.elements = this.elements.filterWhere(
        n => n.prop(`style`)[name] === value,
      )
      it(`has a style ${name} with value ${value}`, () =>
        expect(this.elements.length).toBeGreaterThan(0))
    } else {
      this.elements = this.elements.filterWhere(n => n.prop(`style`)[name])
      it(`has a style ${name}`, () =>
        expect(this.elements.length).toBeGreaterThan(0))
    }
    return this
  }

  has_css(selector, callback) {
    const element = this.elements.find(selector)
    it(`has a ${selector}`, () => expect(element.length).toBeGreaterThan(0))
    const element_tester = new ElementTester(element)
    if (callback) callback.call(undefined, element_tester)
    return element_tester
  }
}
export default ElementTester

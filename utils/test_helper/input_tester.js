export class InputTester {
  constructor(wrapper, selector, callback) {
    this.wrapper = wrapper

    this.input = this._findInput(selector)
    describe(`an input`, () => {
      callback.call(undefined, this)
    })
  }

  _findInput(selector) {
    const input = this.wrapper
      .find(`input`)
      .filterWhere(n => n.prop(selector[0]) === selector[1])
    return input
  }

  fill_in(value) {
    this.input.simulate(`change`, {
      target: { name: this.input.props().name, value: value },
    })
    return this
  }

  expect_value(value) {
    it(`has value: ${value}`, () =>
      expect(this.input.props().value).toBe(value))
    return this
  }

  fill_in_and_expect(value) {
    this.fill_in(value)
    this.expect_value(value)
    return this
  }
}
export default InputTester

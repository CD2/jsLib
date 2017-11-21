export class FunctionTester {

  constructor(instance, function_name, args){
    this.instance = instance
    this.function_name = function_name
    this.args = args
    const func = this.instance[this.function_name]
    it (`should have a function ${function_name}`, () => {
      expect(typeof func).toEqual(`function`)
    })
    const _call = () => func.apply(this.instance, this.args)

    describe(`has a function ${function_name}`, () => {
      it(`doesnt throw error`, () => {
        expect(() => {
          _call()
        }).not.toThrow()
      })
      this.result = _call()
    })
  }

  expect_return_to_eq(expected_result){
    it (
      `expect ${this.result} to eq ${expected_result}`,
      () => expect(this.result).toBe(expected_result)
    )
    return this
  }
  expect_return_to_include(args){
    it (`expect ${JSON.stringify(args)} to contain ${JSON.stringify(this.result)}`, () => {
      expect(this.result).toEqual(expect.objectContaining(
        args
      ))
    })
  }
  with_return(callback){
    callback.call(null, this.result)
  }

}
export default FunctionTester

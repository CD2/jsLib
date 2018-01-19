export default (...args) => {
  let decorated = args[args.length - 1]
  if (args.length > 1) {
    for (let i = args.length - 1; i; i--) {
      decorated = args[i - 1](decorated)
    }
  }
  return decorated
}

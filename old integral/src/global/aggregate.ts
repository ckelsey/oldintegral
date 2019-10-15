import map from "./map"

const transform = (func, index) => { return { [func.name ? func.name : index]: func() } }
const assign = (target, input) => Object.assign(target, input)
const aggregate = (...funcs) => (input = {}) => funcs.reduce(map(transform)(assign), input)

export default aggregate
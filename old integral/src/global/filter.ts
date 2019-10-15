const filter = predicateFn => reduceFn => (target, input) => predicateFn(input) ? reduceFn(target, input) : target
export default filter
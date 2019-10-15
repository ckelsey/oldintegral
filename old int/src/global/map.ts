const map = transformFn => assignFn => (target = assignFn(), input) => (assignFn(target, transformFn(input)))
export default map
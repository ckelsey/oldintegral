const primitives = [
    `string`,
    `number`,
    `null`,
    `undefined`,
    `function`
]
const isPrimitive = s => primitives.indexOf(typeof s) > -1
const isArray = s => Array.isArray(s)
const isDate = s => s instanceof Date
const isObject = s => (typeof s).indexOf(`object`) > -1

const getType = thing => thing === null ? null : isPrimitive(thing) ? typeof thing : isArray(thing) ? `array` : isDate(thing) ? `date` : isObject(thing) ? `object` : typeof thing

const empty = val => {
    const type = getType(val)

    return type === `undefined` || type === undefined || type === null || (type === `array` && val.length === 0) || (type === `object` && Object.keys(val).length === 0)
}

const Type = {
    get: getType,
    primitives,
    isPrimitive,
    isArray,
    isDate,
    isObject,
    empty
}

export default Type
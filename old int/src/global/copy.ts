const copy = source => {
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
    const isObjectLike = s => (typeof s).indexOf(`object`) > -1

    if (isPrimitive(source)) {
        return source
    }

    if (isArray(source)) {
        return source.map(copy)
    }

    if (isDate(source)) {
        return new Date(source.getTime())
    }

    if (isObjectLike(source)) {
        const result = {}
        for (let s in source) {
            result[s] = copy(source[s])
        }

        return result
    }
}

export default copy
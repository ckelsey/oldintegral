import Type from "./type"

const search = (thing, value, skipKeys = []) => {
    const getCircularReplacer = () => {
        const seen = new WeakSet()
        return (_key, value) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return
                }
                seen.add(value)
            }
            return value
        }
    }

    let data = thing
    const type = Type.get(data)
    const valType = Type.get(value)
    const trimmedValue = valType === `string` ? value.toLowerCase().trim() : value

    if (type === `object`) {
        data = JSON.parse(JSON.stringify(data, getCircularReplacer()))
    }

    if (Type.empty(value)) {
        return thing
    }

    if (Type.empty(data)) {
        return undefined
    }

    switch (type) {
        case `string`:
            if (valType === `string`) {
                const v = data.toLowerCase().trim()
                return v.indexOf(trimmedValue) > -1 ? data : undefined
            }

            return undefined

        case `array`:
            const filtered = data
                .map(item => search(item, value, skipKeys))
                .filter(item => !Type.empty(item))

            return filtered.length ? filtered : undefined

        case `object`:
            let result: any = {}

            for (let p in data) {
                if (!Type.empty(data[p])) {
                    if (Type.get(skipKeys) === `array` && skipKeys.indexOf(p) > -1) {
                        result[p] = data[p]
                    } else {
                        console.log(skipKeys.indexOf(p), p)
                        const matched = search(data[p], value, skipKeys)

                        if (!Type.empty(matched)) {
                            result[p] = matched
                        }
                    }
                }
            }

            return !Type.empty(result) ? result : undefined

        default:
            return data === value ? data : undefined
    }
}

export default search
const using = data => {
    return {
        do(func) {
            return using(func(data))
        },

        doIf(func, condition) {
            const truth = typeof condition === `function` ? condition(data) : condition
            return truth ? this.do(func) : this
        },

        value() {
            return data
        },

        map(transformFn) {
            return using(
                data.map(
                    value => transformFn(value)
                )
            )
        },

        flattenObjectArray() {
            return using(
                Object.assign(
                    {},
                    data.reduce(
                        (target, current) => Object.assign(target, current)
                    )
                )
            )
        },
        trace(fn?) {
            if (fn) {
                if (typeof fn === `function`) {
                    console.log(fn(data))
                } else {
                    console.log(fn)
                }
            } else {
                console.log(`data`, data)
            }

            return this
        }
    }
}

export default using
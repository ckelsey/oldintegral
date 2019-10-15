function curry(func, cachedArgs = []) {

    return function (...args) {

        cachedArgs = cachedArgs.concat(...args)

        if (cachedArgs.length >= func.length) {
            return func.apply(this, cachedArgs)

        } else {

            return curry(func, cachedArgs)
        }
    }

}

export default curry
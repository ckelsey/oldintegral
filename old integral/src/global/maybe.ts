const maybe = (value) => {
    var isNothing = typeof value === 'undefined' || value === null || (Array.isArray(value) && !value.length) || value === ``

    return {
        bind: function (fn) {
            return isNothing ? this : maybe(fn.call(this, value))
        },
        isNothing: function () { return isNothing },
        value: function () { return value },
        maybe: function (defaultValue, fn) {
            return isNothing ? typeof defaultValue === `function`? defaultValue() : defaultValue : fn.call(this, value);
        },
    }
}

export default maybe
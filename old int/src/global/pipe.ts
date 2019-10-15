const pipe = (...functions) => data => functions.reduce((value, func) => typeof func !== `function` ? value : func(value), data)

export default pipe
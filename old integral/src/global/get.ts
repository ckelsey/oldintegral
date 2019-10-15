// import maybe from "./maybe"

// const get = source => path => maybe(path)
//     .maybe(
//         undefined,
//         value => value
//             .split(`.`)
//             .reduce(
//                 (newVal, key) => newVal[key.trim()],
//                 typeof source === `function` ? source() : source
//             )
//     )

const get = (
    el: any = {},
    path: string = ``,
    emptyVal: any = undefined
) => {
    let _path = [el]

    if (path && path.toString().split) {
        _path = [el].concat(path.toString().split(`.`))
    }

    var result = _path.reduce(function (accumulator, currentValue) {
        if (accumulator === undefined) {
            return emptyVal
        }

        if (currentValue.indexOf(`.`) === -1 && currentValue.indexOf(`(`) > -1) {
            var argsString = /\((.*?)\)/g.exec(currentValue)[1]
            var args = argsString.split(`,`).map((arg) => { return arg.trim() })
            var functionName = currentValue.split(`(`)[0]

            if (typeof accumulator[functionName] === `function`) {
                var result = accumulator[functionName].apply(accumulator, args)
                return result
            }
        }

        if (currentValue) {
            return accumulator[currentValue]
        } else {
            return accumulator
        }

    })

    if (result === undefined) {
        return emptyVal
    }

    return result
}

export default get
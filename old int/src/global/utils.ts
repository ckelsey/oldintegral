import Observable from './observable'
import get from './get'
import partial from './partial';


const randomColor = () => {
    const rand = Math.random() * Math.pow(255, 3)
    let color = `#`
    for (var i = 0; i < 3; i++) {
        color += ("00" + ((rand >> i++ * 8) & 0xFF).toString(16)).slice(-2)
    }
    return color
}

const getId = prefix => `${prefix ? `${prefix}_`: ``}${new Date().getTime()}_${Math.round(Math.random() * 10000)}`

const dragX = (e, callback, endCallback?) => {
    let lastX = e.x

    let move = (_e) => {
        if (callback && typeof callback === `function`) {
            callback(_e.x - lastX)
        }

        lastX = _e.x
    }

    let stop = (_e) => {
        window.removeEventListener(`mousemove`, move)
        window.removeEventListener(`mouseup`, stop)
        window.removeEventListener(`mouseleave`, stop)
        document.body.removeEventListener(`mouseup`, stop)
        document.body.removeEventListener(`mouseleave`, stop)

        if (endCallback && typeof endCallback === `function`) {
            endCallback()
        }
    }

    window.addEventListener(`mousemove`, move)
    window.addEventListener(`mouseup`, stop)
    window.addEventListener(`mouseleave`, stop)
    document.body.addEventListener(`mouseup`, stop)
    document.body.addEventListener(`mouseleave`, stop)
}

const dragX$ = element => next => {
    Observable.fromEvent(element, `mousedown`).subscribe(e => {
        let lastX = e.x

        const mouseMove = Observable.fromEvent(window as any, `mousemove`)
            .subscribe(moveEvent => {
                next(lastX - moveEvent.x)
                lastX = moveEvent.x
            })

        const stop = Observable.merge(
            Observable.fromEvent(window as any, `mouseup`),
            Observable.fromEvent(window as any, `mouseleave`)
        ).subscribe(() => {
            mouseMove()
            stop()
        })
    })
}

const dragY = (e, callback, endCallback) => {
    let lastY = e.y

    let move = (_e) => {
        if (callback && typeof callback === `function`) {
            callback(_e.y - lastY)
        }

        lastY = _e.y
    }

    let stop = (_e) => {
        window.removeEventListener(`mousemove`, move)
        window.removeEventListener(`mouseup`, stop)
        window.removeEventListener(`mouseleave`, stop)
        document.body.removeEventListener(`mouseup`, stop)
        document.body.removeEventListener(`mouseleave`, stop)

        if (endCallback && typeof endCallback === `function`) {
            endCallback()
        }
    }

    window.addEventListener(`mousemove`, move)
    window.addEventListener(`mouseup`, stop)
    window.addEventListener(`mouseleave`, stop)
    document.body.addEventListener(`mouseup`, stop)
    document.body.addEventListener(`mouseleave`, stop)
}

const mergeArrays = (...arrays) => {
    let indexOfMost = 0
    let largestArray = arrays[indexOfMost]
    const result = []

    arrays.forEach((array, index) => {
        if (array.length > largestArray.length) {
            indexOfMost = index
            largestArray = array
        }
    })

    largestArray.forEach(() => {
        let value
        arrays.forEach(arrayCandidate => {
            if (arrayCandidate !== undefined && arrayCandidate !== null) {
                value = arrayCandidate
            }
        })

        result.push(value)
    })


    return result
}



const divide = amount => input => input / amount

const _performance = {
    get: path => get(performance, path),
    memory: transform => path => transform(_performance.get(`memory.${path}`))
}

// const elementAtIndexOrCreateNew = createFn => elements => onNewFn => index => {
//     if (typeof elements === `function`) {
//         elements = elements()
//     }

//     if (!elements || !elements[index]) {
//         onNewFn(index)
//         return createFn()
//     }

//     return elements[index]
// }



const thisOrThat = find => make => {
    let value = find

    if (typeof find === `function`) {
        value = find()
    }

    return typeof value !== 'undefined' && value !== null && value !== `` ? value : typeof make === `function` ? make() : make
}

const functionsToObject = aggregateFn => objectDefineFn => returnFn => functionNamesArray =>
    aggregateFn
        .apply(
            null,
            functionNamesArray
                .map(name => {
                    const fn = () => returnFn(name)
                    objectDefineFn(fn, "name", { value: name })
                    return fn
                })
        )

const scaleX_originRight = (vX1 = 0) => (vX2 = 0) => (X1 = 0) => (X2 = 0) => (x1 = 0) => (x2 = 0) => (new_x1 = 0) => {

    const shift = x1 - new_x1
    const currentScale = (X2 - X1) / (x2 - x1)
    const newScale = (X2 - X1) / (x2 - new_x1)
    const new_x2 = x2
    const new_X1 = X1 - (shift * currentScale)
    const new_X2 = X2
    const scaleShift = ``

    return {
        X1,
        X2,
        x1,
        x2,
        vX1,
        vX2,
        currentScale,
        newScale,
        new_x1,
        new_x2,
        new_X1,
        new_X2,
        scaleShift
    }
}

const scaleX_originRight_partial = partial(scaleX_originRight)

const hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

const setProperty = source => path => val => {
    if (path) {
        path = [source].concat(path.split(`.`))
    } else {
        path = [source]
    }

    var result = path.reduce(function (accumulator, currentValue) {
        if (!accumulator) {
            accumulator = {}
        }

        if (!accumulator[currentValue]) {
            accumulator[currentValue] = {}
        }

        if (currentValue) {
            if (currentValue === path[path.length - 1]) {
                accumulator[currentValue] = val
            }

            return accumulator[currentValue]
        } else {
            accumulator[currentValue] = null
            return accumulator
        }
    })

    return result
}

const getProperty = (el, path, emptyVal) => {
    if (path && path.toString().split) {
        path = [el].concat(path.toString().split(`.`))
    } else {
        path = [el]
    }

    var result = path.reduce(function (accumulator, currentValue) {
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

export default {
    randomColor,
    dragY,
    dragX,
    dragX$,
    Observable,
    mergeArrays,
    math: {
        divide
    },
    browser: {
        performance: _performance
    },
    conversion: {
        b2Kb: divide(1024),
        b2Mb: divide(1024 * 1024),
        hexToRgb: hexToRgb
    },
    thisOrThat,
    functionsToObject,
    scaleX_originRight,
    scaleX_originRight_partial,
    setProperty,
    getProperty,
    getId
}
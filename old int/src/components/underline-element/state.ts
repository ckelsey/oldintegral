import HTML from "../../global/html"
import Type from "../../global/type"

const Events = [
    `focus`,
    `blur`,
    `error`,
    `load`,
    `animationstart`,
    `animationend`,
    `animationiteration`,
    `transitionstart`,
    `transitioncancel`,
    `transitionend`,
    `transitionrun`,
    `reset`,
    `submit`,
    `resize`,
    `scroll`,
    `keydown`,
    `keypress`,
    `keyup`,
    `click`,
    `dblclick`,
    `mouseenter`,
    `mouseover`,
    `mouseout`,
    `mouseleave`,
    `mousedown`,
    `mousemove`,
    `mouseup`,
    `select`,
    `wheel`,
    `drag`,
    `dragend`,
    `dragstart`,
    `dragenter`,
    `dragover`,
    `dragleave`,
    `drop`,
    `play`,
    `pause`,
    `change`,
    `input`,
    `visibilitychange`,
    `touchcancel`,
    `touchstart`,
    `touchend`,
    `touchmove`,
    `touchenter`,
    `touchleave`
]

const Properties = {
    start: `mouseenter`,
    end: `mouseleave`,
    color: `#59a2d8`,
    direction: `interaction`,
    speed: 400,
    opacity: 0.2,
    targets: [document.body]
}

function UnderlineState(properties: UnderlineProperties, updateFn: Function): UnderlineProperties {

    const invalid = (key, value) => {
        const empty = Type.empty(value)
        const type = Type.get(value)

        switch (key) {
            case `start`:
                return empty || Events.indexOf(value) === -1

            case `end`:
                return value !== undefined && Events.indexOf(value) === -1

            case `speed`:
                return empty || type !== `number`

            case `opacity`:
                return empty || type !== `number` || value > 1 || value < 0

            case `color`:
            case `direction`:
                return empty || type !== `string`

            case `targets`:
                return empty || !Array.isArray(value) || value.filter(v => typeof v.querySelector === `function`).length === 0
        }
    }

    properties = Object.assign(
        properties,
        { container: HTML(properties.container) }
    )

    let _properties: any = {}
    let start = Symbol(`start`)
    let end = Symbol(`end`)
    let speed = Symbol(`speed`)
    let opacity = Symbol(`opacity`)
    let color = Symbol(`color`)
    let direction = Symbol(`direction`)
    let targets = Symbol(`targets`)
    let container = Symbol(`container`)


    Object.defineProperties(
        _properties,
        {
            [start]: { value: invalid(`start`, properties.start) ? Properties[`start`] : properties.start, writable: true },
            start: {
                get: function () { return this[start] },
                set: function (value) {
                    if (!invalid(`start`, properties.start)) {
                        this[start] = value
                        updateFn(`start`, this[start])
                    }
                }
            },

            [end]: { value: invalid(`end`, properties.end) ? Properties[`end`] : properties.end, writable: true },
            end: {
                get: function () { return this[end] },
                set: function (value) {
                    if (!invalid(`end`, properties.end)) {
                        this[end] = value
                        updateFn(`end`, this[end])
                    }
                }
            },

            [speed]: { value: invalid(`speed`, properties.speed) ? Properties[`speed`] : properties.speed, writable: true },
            speed: {
                get: function () { return this[speed] },
                set: function (value) {
                    if (!invalid(`speed`, properties.speed)) {
                        this[speed] = value
                        updateFn(`speed`, this[speed])
                    }
                }
            },

            [opacity]: { value: invalid(`opacity`, properties.opacity) ? Properties[`opacity`] : properties.opacity, writable: true },
            opacity: {
                get: function () { return this[opacity] },
                set: function (value) {
                    if (!invalid(`opacity`, properties.opacity)) {
                        this[opacity] = value
                        updateFn(`opacity`, this[opacity])
                    }
                }
            },

            [color]: { value: invalid(`color`, properties.color) ? Properties[`color`] : properties.color, writable: true },
            color: {
                get: function () { return this[color] },
                set: function (value) {
                    if (!invalid(`color`, properties.color)) {
                        this[color] = value
                        updateFn(`color`, this[color])
                    }
                }
            },

            [direction]: { value: invalid(`direction`, properties.direction) ? Properties[`direction`] : properties.direction, writable: true },
            direction: {
                get: function () { return this[direction] },
                set: function (value) {
                    if (!invalid(`direction`, properties.direction)) {
                        this[direction] = value
                        updateFn(`direction`, this[direction])
                    }
                }
            },

            [targets]: { value: invalid(`targets`, properties.targets) ? Properties[`targets`] : properties.targets, writable: true },
            targets: {
                get: function () { return this[targets] },
                set: function (value) {
                    if (!invalid(`targets`, properties.targets)) {
                        this[targets] = value
                        updateFn(`targets`, this[targets])
                    }
                }
            },

            [container]: { value: properties.container, writable: false },
            container: {
                get: function () { return this[container] }
            },
        }
    )

    return _properties
}

export default UnderlineState
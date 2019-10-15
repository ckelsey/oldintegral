import HTML from "../../global/html"
import Type from "../../global/type"

function inputState(properties, updateFn) {
    const labelPositions = [
        `top`,
        `bottom`,
        `left`,
        `right`,
        `inside`
    ]

    const validValue = (key, val, existing = undefined) => {
        switch (key) {
            case `value`:
                return existing !== val
            case `options`:
                return Array.isArray(val) ? existing !== val : false
            case `labelPosition`:
                return labelPositions.indexOf(val) > -1 ? existing !== val : false

            case `label`:
            case `type`:
            case `iconUrl`:
            case `errorMessage`:
            case `helpMessage`:
            case `placeholder`:
            case `name`:
            case `id`:
            case `autocomplete`:
                return typeof val === `string` ? existing !== val : false

            case `showIcon`:
            case `showClear`:
            case `showCount`:
            case `multiline`:
            case `required`:
            case `autofocus`:
            case `disabled`:
            case `readonly`:
                return typeof val === `boolean` ? existing !== val : false

            case `max`:
            case `min`:
            case `step`:
            case `tabindex`:
                return typeof val === `number` ? existing !== val : false
        }
    }

    const defaultValues = (key, val, existing = undefined) => {
        switch (key) {
            case `labelPosition`:
                return validValue(key, val, existing) ? val : !Type.empty(properties.label) ? `inside` : `top`
            case `type`:
                return validValue(key, val, existing) ? val : `text`

            case `multiline`:
            case `showCount`:
            case `showClear`:
            case `showIcon`:
            case `required`:
            case `autofocus`:
            case `disabled`:
            case `readonly`:
                return validValue(key, val, existing) ? val : false

            default: return val
        }
    }

    properties = Object.assign(
        properties,
        { container: HTML(properties.container) }
    )

    let _properties: any = {}
    let type = Symbol(`type`)
    let label = Symbol(`label`)
    let labelPosition = Symbol(`labelPosition`)
    let options = Symbol(`options`)
    let value = Symbol(`value`)
    let showIcon = Symbol(`showIcon`)
    let iconUrl = Symbol(`iconUrl`)
    let showClear = Symbol(`showClear`)
    let errorMessage = Symbol(`errorMessage`)
    let helpMessage = Symbol(`helpMessage`)
    let showCount = Symbol(`showCount`)
    let multiline = Symbol(`multiline`)
    let max = Symbol(`max`)
    let min = Symbol(`min`)
    let step = Symbol(`step`)
    let required = Symbol(`required`)
    let validator = Symbol(`validator`)
    let placeholder = Symbol(`placeholder`)
    let container = Symbol(`container`)
    let autocomplete = Symbol(`autocomplete`)
    let autofocus = Symbol(`autofocus`)
    let disabled = Symbol(`disabled`)
    let name = Symbol(`name`)
    let readonly = Symbol(`readonly`)
    let tabindex = Symbol(`tabindex`)
    let id = Symbol(`id`)
    let ready = Symbol(`ready`)

    Object.defineProperties(
        _properties,
        {
            [type]: {
                value: defaultValues(`type`, properties.type),
                writable: true
            },
            [label]: {
                value: defaultValues(`label`, properties.label),
                writable: true
            },
            [labelPosition]: {
                value: defaultValues(`labelPosition`, properties.labelPosition),
                writable: true
            },
            [options]: {
                value: defaultValues(`options`, properties.options),
                writable: true
            },
            [value]: {
                value: defaultValues(`value`, properties.value),
                writable: true
            },
            [showIcon]: {
                value: defaultValues(`showIcon`, properties.showIcon),
                writable: true
            },
            [iconUrl]: {
                value: defaultValues(`iconUrl`, properties.iconUrl),
                writable: true
            },
            [showClear]: {
                value: defaultValues(`showClear`, properties.showClear),
                writable: true
            },
            [errorMessage]: {
                value: defaultValues(`errorMessage`, properties.errorMessage),
                writable: true
            },
            [helpMessage]: {
                value: defaultValues(`helpMessage`, properties.helpMessage),
                writable: true
            },
            [showCount]: {
                value: defaultValues(`showCount`, properties.showCount),
                writable: true
            },
            [multiline]: {
                value: defaultValues(`multiline`, properties.multiline),
                writable: true
            },
            [max]: {
                value: defaultValues(`max`, properties.max),
                writable: true
            },
            [min]: {
                value: defaultValues(`min`, properties.min),
                writable: true
            },
            [step]: {
                value: defaultValues(`step`, properties.step),
                writable: true
            },
            [required]: {
                value: defaultValues(`required`, properties.required),
                writable: true
            },
            [validator]: {
                value: properties.validator,
                writable: true
            },
            [placeholder]: {
                value: defaultValues(`placeholder`, properties.placeholder),
                writable: true
            },
            [container]: {
                value: properties.container,
                writable: false
            },
            [autocomplete]: {
                value: properties.autocomplete === false ?
                    undefined :
                    Type.empty(properties.autocomplete) ?
                        properties.type :
                        properties.autocomplete,
                writable: true
            },
            [autofocus]: {
                value: defaultValues(`autofocus`, properties.autofocus),
                writable: true
            },
            [disabled]: {
                value: defaultValues(`disabled`, properties.disabled),
                writable: true
            },
            [name]: {
                value: defaultValues(`name`, properties.name),
                writable: true
            },
            [readonly]: {
                value: defaultValues(`readonly`, properties.readonly),
                writable: true
            },
            [tabindex]: {
                value: defaultValues(`tabindex`, properties.tabindex),
                writable: true
            },
            [id]: {
                value: defaultValues(`id`, properties.id),
                writable: false
            },
            [ready]: {
                value: typeof properties.ready === `boolean` ? properties.ready : false,
                writable: true
            },

            type: {
                get: function () { return this[type] },
                set: function (value) {
                    if (validValue(`type`, value, this[type])) {
                        this[type] = value
                        updateFn(`type`, this[type])
                    }
                }
            },
            label: {
                get: function () { return this[label] },
                set: function (value) {
                    if (validValue(`label`, value, this[label])) {
                        this[label] = value
                        updateFn(`label`, this[label])
                    }
                }
            },
            labelPosition: {
                get: function () { return this[labelPosition] },
                set: function (value) {
                    if (validValue(`labelPosition`, value, this[labelPosition])) {
                        this[labelPosition] = value
                        updateFn(`labelPosition`, this[labelPosition])
                    }
                }
            },
            options: {
                get: function () { return this[options] },
                set: function (value) {
                    if (validValue(`options`, options, this[options])) {
                        this[options] = value
                        updateFn(`options`, this[options])
                    }
                }
            },
            value: {
                get: function () { return this[value] },
                set: function (value) {
                    if (validValue(`value`, value, this[value])) {
                        this[value] = value
                        updateFn(`value`, this[value])
                    }
                }
            },
            showIcon: {
                get: function () { return this[showIcon] },
                set: function (value) {
                    if (validValue(`showIcon`, value, this[showIcon])) {
                        this[showIcon] = value
                        updateFn(`showIcon`, this[showIcon])
                    }
                }
            },
            iconUrl: {
                get: function () { return this[iconUrl] },
                set: function (value) {
                    if (validValue(`iconUrl`, value, this[iconUrl])) {
                        this[iconUrl] = value
                        updateFn(`iconUrl`, this[iconUrl])
                    }
                }
            },
            showClear: {
                get: function () { return this[showClear] },
                set: function (value) {
                    if (validValue(`showClear`, value, this[showClear])) {
                        this[showClear] = value
                        updateFn(`showClear`, this[showClear])
                    }
                }
            },
            errorMessage: {
                get: function () { return this[errorMessage] },
                set: function (value) {
                    if (validValue(`errorMessage`, value, this[errorMessage])) {
                        this[errorMessage] = value
                        updateFn(`errorMessage`, this[errorMessage])
                    }
                }
            },
            helpMessage: {
                get: function () { return this[helpMessage] },
                set: function (value) {
                    if (validValue(`helpMessage`, value, this[helpMessage])) {
                        this[helpMessage] = value
                        updateFn(`helpMessage`, this[helpMessage])
                    }
                }
            },
            showCount: {
                get: function () { return this[showCount] },
                set: function (value) {
                    if (validValue(`showCount`, value, this[showCount])) {
                        this[showCount] = value
                        updateFn(`showCount`, this[showCount])
                    }
                }
            },
            multiline: {
                get: function () { return this[multiline] },
                set: function (value) {
                    if (validValue(`multiline`, value, this[multiline])) {
                        this[multiline] = value
                        updateFn(`multiline`, this[multiline])
                    }
                }
            },
            max: {
                get: function () { return this[max] },
                set: function (value) {
                    if (validValue(`max`, value, this[max])) {
                        this[max] = value
                        updateFn(`max`, this[max])
                    }
                }
            },
            min: {
                get: function () { return this[min] },
                set: function (value) {
                    if (validValue(`min`, value, this[min])) {
                        this[min] = value
                        updateFn(`min`, this[min])
                    }
                }
            },
            step: {
                get: function () { return this[step] },
                set: function (value) {
                    if (validValue(`step`, value, this[step])) {
                        this[step] = value
                        updateFn(`step`, this[step])
                    }
                }
            },
            required: {
                get: function () { return this[required] },
                set: function (value) {
                    if (validValue(`required`, value, this[required])) {
                        this[required] = value
                        updateFn(`required`, this[required])
                    }
                }
            },
            validator: {
                get: function () { return this[validator] },
                set: function (value) {
                    this[validator] = value
                    updateFn(`validator`, this[validator])
                }
            },
            placeholder: {
                get: function () { return this[placeholder] },
                set: function (value) {
                    if (validValue(`placeholder`, value, this[placeholder])) {
                        this[placeholder] = value
                        updateFn(`placeholder`, this[placeholder])
                    }
                }
            },
            container: {
                get: function () { return this[container] },
                set: function () { }
            },
            autocomplete: {
                get: function () { return this[autocomplete] },
                set: function (value) {
                    if (validValue(`autocomplete`, value, this[autocomplete])) {
                        this[autocomplete] = value
                        updateFn(`autocomplete`, this[autocomplete])
                    }
                }
            },
            autofocus: {
                get: function () { return this[autofocus] },
                set: function (value) {
                    if (validValue(`autofocus`, value, this[autofocus])) {
                        this[autofocus] = value
                        updateFn(`autofocus`, this[autofocus])
                    }
                }
            },
            disabled: {
                get: function () { return this[disabled] },
                set: function (value) {
                    if (validValue(`disabled`, value, this[disabled])) {
                        this[disabled] = value
                        updateFn(`disabled`, this[disabled])
                    }
                }
            },
            name: {
                get: function () { return this[name] },
                set: function (value) {
                    if (validValue(`name`, value, this[name])) {
                        this[name] = value
                        updateFn(`name`, this[name])
                    }
                }
            },
            readonly: {
                get: function () { return this[readonly] },
                set: function (value) {
                    if (validValue(`readonly`, value, this[readonly])) {
                        this[readonly] = value
                        updateFn(`readonly`, this[readonly])
                    }
                }
            },
            tabindex: {
                get: function () { return this[tabindex] },
                set: function (value) {
                    if (validValue(`tabindex`, value, this[tabindex])) {
                        this[tabindex] = value
                        updateFn(`tabindex`, this[tabindex])
                    }
                }
            },
            id: {
                get: function () { return this[id] },
                set: function () { }
            },
            ready: {
                get: function () { return this[ready] },
                set: function () { }
            },
        }
    )

    return _properties
}

export default inputState
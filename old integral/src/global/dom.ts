import type from "./type"

const ns = `http://www.w3.org/2000/svg`
const xmlNs = `http://www.w3.org/2000/xmlns/`
const createElNsString = `createElementNS`
const createElString = `createElement`

const isSvgEl = tag => [`svg`, `polyline`, `rect`, `g`].indexOf(tag) > -1

const createAndAppend = (attributes, tag, parent, events?) => {
    if (!parent) {
        return
    }

    const element = create(attributes, tag, events)

    parent.appendChild(element)

    return element
}

const create = (attributes, tag, events?) => {
    const isSvg = isSvgEl(tag)
    const createMethod = isSvg ? createElNsString : createElString
    const args = isSvg ? [ns, tag] : [tag]
    const element = (document as any)[createMethod](...args)

    if (attributes) {
        Object.keys(attributes).forEach(key => {
            const primitive = type.isPrimitive(attributes[key])

            if (!primitive) {
                element[key] = attributes[key]
                return
            }

            if (isSvg) {
                try {
                    element.setAttributeNS(xmlNs, key, attributes[key])

                } catch (error) {
                    element.setAttribute(key, attributes[key])
                }

            } else {
                element.setAttribute(key, attributes[key])
            }
        })
    }

    if (events) {
        Object.keys(events).forEach(key => {
            const fn = events[key].fn
            const args = events[key].args || []

            element.addEventListener(key, (event) => {
                fn.call(null, args.concat([event]))
            })
        })
    }

    return element
}

const appendAttribute = element => attribute => value => {
    if (!element) {
        return
    }

    let currentValue = getAttribute(element)(attribute)

    if (currentValue === null) {
        currentValue = ``
    }

    setAttribute(element)(attribute)(`${currentValue}${value}`.trim())

    return element
}

const getAttribute = element => attribute => {
    if (!element) {
        return null
    }

    return element.getAttribute(attribute)
}
const setAttribute = element => attribute => value => {
    if (!element) {
        return null
    }

    element.setAttribute(attribute, value)

    return element
}
const findElement = (context, selector) => {
    if (!context) {
        return null
    }

    return context.querySelector(selector)
}
const findElements = (context: HTMLElement, selector: string) => {
    if (!context) {
        return []
    }

    return context.querySelectorAll(selector)
}

const setStyle = element => key => value => {
    if (!element) {
        return null
    }

    if (value === undefined || value === null) {
        element.style.removeProperty(key)
    }

    element.style[key] = value

    return element
}

const appendChild = (parent, child) => {
    if (!parent || !child) {
        return null
    }

    parent.appendChild(child)
    return child
}
const addClass = element => clss => {
    if (!element) {
        return null
    }

    element.classList.add(clss)

    return element
}
const removeClass = element => clss => {
    if (!element) {
        return null
    }

    element.classList.remove(clss)

    return element
}

const indexOf = (parent, selector, child) => Array.from(parent.querySelectorAll(selector && selector !== `` ? selector : `:source > *`)).indexOf(child)

const toLastChild = parent => child => parent.appendChild(child)

const setText = (text, element) => {
    if (!element) {
        element = this
    }

    element.textContent = text
    return element
}

const setHtml = (html, element) => {
    if (!element) {
        element = this
    }

    element.innerHTML = html
    return element
}

export default {
    create,
    createAndAppend,
    appendAttribute,
    getAttribute,
    setAttribute,
    findElement,
    findElements,
    setStyle,
    appendChild,
    addClass,
    removeClass,
    indexOf,
    toLastChild,
    setText,
    setHtml
}
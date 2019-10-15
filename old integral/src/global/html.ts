/**
 * TODO
 * validate setHtml
 */
import type from "./type"
import get from "./get";
import Type from "./type";
// import SafeHtml from "./safe-html";

const ns = `http://www.w3.org/2000/svg`
const xmlNs = `http://www.w3.org/2000/xmlns/`

function getDimensions(): {
    left: number
    right: number
    top: number
    bottom: number
    x: number
    y: number
    width: number
    height: number
} {
    return this.element.getBoundingClientRect()
}

function stringify(string) {
    return Type.empty(string) ? `` : string
}

function isSvgTag(tag: string): boolean {
    return [`svg`, `polyline`, `rect`, `g`].indexOf(tag) > -1
}

function isValid(): boolean {
    var nativeMatches = (this.element.matches || this.element.msMatchesSelector)

    try {
        return nativeMatches.call(this.element, `:valid`)
    } catch (error) {
        return false
    }
}

function isAutoFilled(): boolean {
    const nativeMatches = (this.element.matches || this.element.msMatchesSelector)

    try {
        return nativeMatches.call(this.element, `:-webkit-autofill`)
    } catch (error) {
        try {
            return nativeMatches.call(this.element, `:-moz-autofill`)
        } catch (error) {
            try {
                return nativeMatches.call(this.element, `:-ms-autofill`)
            } catch (error) {
                try {
                    return nativeMatches.call(this.element, `:-o-autofill`)
                } catch (error) {
                    try {
                        return nativeMatches.call(this.element, `:autofill`)
                    } catch (error) {
                        return false
                    }
                }
            }
        }
    }
}

function isFocused(): boolean {
    if (this.element.focused) {
        return true
    }

    const nativeMatches = (this.element.matches || this.element.msMatchesSelector)

    try {
        return nativeMatches.call(this.element, `:focus`)
    } catch (error) {
        return false
    }
}

function insert(element: HTMLElement, index: number = 0): HTMLModel {
    this.element.insertBefore(getElement(element), this.element.children[index])
    return this
}

function indexOf(child: HTMLElement, selector: string = `:scope > *`): number {
    child = getElement(child)
    let index: any = 0

    const _indexOf = el => {
        return Array.from(el.querySelectorAll(selector)).indexOf(child)
    }

    if (Array.isArray(this.elements)) {
        index = []
        this.elements.forEach(el => {
            index.push(_indexOf(el))
        })
    } else {
        index = _indexOf(this.element)
    }

    return index
}

function addClass(clss: string): HTMLModel {
    const add = (el) => el.classList.add(clss)

    if (Array.isArray(this.element)) {
        this.element.forEach(add)
    } else {
        add(this.element)
    }

    return this
}

function removeClass(clss: string): HTMLModel {
    const remove = (el) => el.classList.remove(clss)

    if (Array.isArray(this.element)) {
        this.element.forEach(remove)
    } else {
        remove(this.element)
    }

    return this
}

function style(styles: GenericObjects): HTMLModel {
    for (let v in styles) {
        this.element.style[v] = styles[v]
    }

    return this
}

function classArray(): string[] {
    return get(this.element, `className`, ``).split(` `).map(c => c.trim())
}

function elementSelector(): string {
    const clssArray = this.classArray()
    const classes = `${clssArray.length ? `.` : ``}${clssArray.join(` .`)}`
    return this.element.id ? `#${this.element.id}${classes}` : `${classes}`
}

function equals(element: any): boolean {
    return this.element === getElement(element)
}

function find(selector: string): HTMLModel {
    const el = this.element.querySelector(selector)
    return el ? HTML(el) : el
}

function findAll(selector: string): HTMLModel[] {
    return Array.from(this.element.querySelectorAll(selector).map(HTML))
}

function findAt(selector: string, index: number = 0): HTMLModel {
    return HTML(this.element.querySelectorAll(selector)[index])
}

function children(): HTMLModel[] {
    return Array.from(this.element.children)
        .map(child => HTML(child as HTMLElement))
}

function remove(element): HTMLModel {
    element = getElement(element)
    this.element.removeChild(element)
    return this
}

function parent(): HTMLModel {
    const parents = [
        `parentNode`,
        `parentElement`,
        `parent`,
        `host`
    ]

    const length = parents.length
    let index = 0
    let p

    while ((!p || (p && typeof p.appendChild !== `function`)) && index < length) {
        p = this.element[parents[index]]
        index = index + 1
    }

    if (!p || typeof p.appendChild !== `function`) {
        return
    }

    return HTML(p)
}

function getAttribute(attrName, asValue = false): any {
    return asValue ? this.element[attrName] : this.element.getAttribute(attrName)
}

function setAttribute(attrName, value, asValue = false): HTMLModel {
    if (asValue) {
        this.element[attrName] = value
    } else {
        this.element.setAttribute(attrName, value)
    }

    return this
}

function isInstance(el: any) {
    return el && el.instanceof === `HTML`
}

function getElement(el: any): HTMLElement {
    if (isInstance(el)) {
        el = el.element
    }
    return el
}

function append(element: HTMLElement | HTMLModel): HTMLModel {
    element = getElement(element)
    this.element.appendChild(element)
    return this
}

function appendTo(parent: HTMLElement): HTMLModel {
    parent = getElement(parent)
    parent.appendChild(this.element)
    return this
}

function insertIn(parent: HTMLElement, index: number = 0): HTMLModel {
    parent.insertBefore(this.element, parent.children[index])
    return this
}

function create(attributes: GenericObjects, tag: string, events?: GenericObjects): HTMLModel {
    const isSvg = isSvgTag(tag)
    const element = isSvg ? document.createElementNS(ns, tag) : document.createElement(tag)
    const setProperty = (name, val) => { element[name] = val }
    const setAttribute = (key, val) => element.setAttribute(key, val)

    if (attributes) {
        Object.keys(attributes).forEach(key => {
            const value = attributes[key]

            if (Type.empty(value)){
                return
            }
            
            const primitive = type.isPrimitive(value)
            const keySplit = key.split(`on`)

            if (keySplit.length > 1 && typeof value === `function`) {
                const eventName = keySplit[1].toLowerCase().trim()
                return element.addEventListener(eventName, value)
            }

            if (!primitive || typeof value === `boolean`) {
                return setProperty(key, value)
            }

            if (isSvg) {
                try {
                    element.setAttributeNS(xmlNs, key, value)
                    return
                } catch (error) { }
            }

            setAttribute(key, value)
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

    return HTML(element)
}

function createAndAppend(attributes: GenericObjects, tag: string, events?: GenericObjects): HTMLModel {
    this.element.appendChild(this.create(attributes, tag, events).element)
    return this
}

function setText(text: string): HTMLModel {
    this.element.textContent = stringify(text)
    return this
}

function setHtml(html: string): HTMLModel {
    this.element.innerHTML = stringify(html)
    return this
}

function doIf(fn: Function, condition: Function | boolean): HTMLModel {
    if (typeof condition === `function` ? condition() : condition) {
        fn = fn.bind(this)
        fn()
    }
    return this
}

function clear(): HTMLModel {
    this.element.innerHTML = ``
    return this
}

function addEvent(name: string, fn: Function, bubble: boolean = false): HTMLModel {
    this.element.addEventListener(name, fn, bubble)
    return this
}

function isDom(el) {
    return el instanceof HTMLElement
}

function bind(key, value){
    console.log(key,value)
}

interface GenericObjects {
    [key: string]: any
}

function HTML
    (
        _element: HTMLElement | GenericObjects = document.body,
        tag = `div`,
        events = undefined
    ): HTMLModel {

    const e = _element as any

    if (e) {
        if (e && e.instanceof === `HTML`) {
            return e
        }

        if (!isDom(e)) {
            return HTML().create(e, tag, events)
        }
    }

    const methods = {
        get element(): HTMLElement {
            return _element as HTMLElement
        },

        create,
        createAndAppend,
        append,
        insert,
        appendTo,
        insertIn,
        remove,
        clear,

        getAttribute,
        setAttribute,
        elementSelector,

        parent,
        find,
        findAll,
        findAt,
        children,
        indexOf,
        equals,

        style,
        getDimensions,

        addClass,
        removeClass,
        classArray,

        setText,
        setHtml,

        doIf,

        addEvent,
        isDom,
        isAutoFilled,
        isValid,
        isFocused,
        bind,

        instanceof: `HTML`
    }

    for (let key in methods) {
        if (typeof methods[key] == 'function') {
            methods[key] = methods[key].bind(methods)
        }
    }

    return methods
}

export default HTML
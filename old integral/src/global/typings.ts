interface ObserverObjectSubscriptionList {
    [key: string]: ObserverObject
}

interface SubscriptionObject {
    subscriptions: { [key: string]: ObserverObject }
    _subscribe: Function
    _unsubscribe: Function
}

interface ObserverObject {
    next: Function
    error: Function
    complete: Function
}

interface ObserverClass extends ObserverObject {
    handler: ObserverObject
    isUnsubscribed: boolean
    id: string
}

interface ObservableObject extends SubscriptionObject {
    isSharing: boolean
    fn: Function
    subscribe: Function
    share: Function
}

interface MenuData {
    label: string
    children: MenuData[]
}

interface BreadcrumbMenuProperties {
    container: HTMLElement | undefined
    itemsClick?: Function
    itemClick?: Function
    onItemClick?: Function
    breadcrumbClick?: Function
    onBreadcrumbClick?: Function
    menu?: string | ListItem[]
    wrapBreadcrumbs?: boolean
    path?: string[]
    search: any
}

interface InputFieldProperties {
    container?: HTMLModel
    value?: any
    type?: string
    label?: string
    labelPosition?: string
    placeholder?: string
    options?: any[]
    showIcon?: boolean
    iconUrl?: string
    showClear?: boolean
    errorMessage?: string
    helpMessage?: string
    showCount?: boolean
    multiline?: boolean
    max?: number | undefined
    min?: number | undefined
    step?: number | undefined
    required?: boolean
    validator?: Function | undefined
    wheninput?: any
    onInput?: Function
    autocomplete?: string
    autofocus?: boolean
    disabled?: boolean
    name?: string
    readonly?: boolean
    tabindex?: number

    id?: string
    ready?: boolean
}

interface InputFieldFactory {
    State: InputFieldProperties
    ContainerClasses: { [className: string]: boolean; }
    InputClasses: { [className: string]: boolean; }
    InputName: string
    update: Function
    updatedProp: Function
    onInput: (event: Event) => void
    onBlur: (event: Event) => void
    onMouseUp: (event: Event) => void
}

interface ListItem {
    label: string
    attributes?: GenericObject
    events?: {
        [key: string]: {
            fn: Function,
            args: any[]
        }
    }
    items?: ListItem[]
    _id?: string
}


interface TimeOutData {
    fn: Function
    time: number
}

interface UnderlineProperties {
    start: string
    end: undefined | string
    color: string
    direction: `interaction` | `toright` | `toleft`
    speed: number
    opacity: number
    container: HTMLModel
    targets: HTMLElement[]
}

interface HTMLModel {
    element: any
    create: Function
    createAndAppend: Function
    append: Function
    insert: Function
    appendTo: Function
    insertIn: Function
    remove: Function
    clear: Function
    getAttribute: Function
    setAttribute: Function
    elementSelector: Function
    parent: Function
    find: Function
    findAll: Function
    findAt: Function
    children: Function
    equals: Function
    style: Function
    addClass: Function
    removeClass: Function
    classArray: Function
    setText: Function
    setHtml: Function
    doIf: Function
    addEvent: Function
    isDom: Function
    instanceof: string
    isFocused: Function
    isAutoFilled: Function
    isValid: Function
    getDimensions: Function
    bind: Function
}

interface VirtualDom {
    elm?: any | undefined
    vkey?: any | undefined
    vname?: any | undefined
    ishost?: boolean
    vattrs?: { [key: string]: any } | undefined
    vchildren?: VirtualDom[] | undefined
    vtag: string
    vtext: string | undefined
}

type GenericObject = { [key: string]: any }

type EventName =
    'click' | `doubleclick` |
    'mousedown' | `mouseup` |
    `mouseover` | 'mouseenter' |
    'mouseout' | 'mouseleave' |
    `keydown` | `keypress` |
    `keyup`
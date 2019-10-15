interface Line {
    label: string
    color: string
    width?: number
    element?: SVGPolylineElement
    data?: [number, number][]
    yRange?: [number, number]
    xRange?: [number, number]
    push?: Function
    pop?: Function
    set?: Function
    shift?: Function
    unshift?: Function
    rangePoints?: number[]
    ranges?: Function
    range?: Function
    setRanges?: Function
    setRange?: Function
    concat?: Function
    remove?: Function
    subscriptions?: { [key: string]: Function[] }
    index: number
    highlight?: Function
    unhighlight?: Function
}

interface Config {
    container: HTMLElement
    lines: Line[]
    x: number
    xbars: number
    y: number
    ybars: number
    subscriptions?: { [key: string]: Function[] }
    triggerSubscriptions?: Function
}
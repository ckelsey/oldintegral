import { Component, Prop, Method, Event, EventEmitter } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'chart-line',
    styleUrl: 'style.scss',
    shadow: true
})

export class ChartLine {
    @Prop() lines: string | Line[]
    @Prop() x: number
    @Prop() xbars: number
    @Prop() y: number
    @Prop() ybars: number

    container: HTMLElement
    _lines: Line[]
    _x: number
    _xbars: number
    _y: number
    _ybars: number
    factory

    @Method()
    getLines(): Line[] {
        return this.factory.getLines()
    }

    @Method()
    getLine(index): Line {
        return this.factory.getLine(index)
    }

    @Event({ bubbles: false, composed: false}) ready: EventEmitter
    @Event({ bubbles: false, composed: false}) linecreated: EventEmitter
    @Event({ bubbles: false, composed: false}) lineupdated: EventEmitter
    @Event({ bubbles: false, composed: false}) linemouseenter: EventEmitter
    @Event({ bubbles: false, composed: false}) linemouseover: EventEmitter
    @Event({ bubbles: false, composed: false}) linemouseleave: EventEmitter
    @Event({ bubbles: false, composed: false}) chartmouseover: EventEmitter
    @Event({ bubbles: false, composed: false}) chartmouseoleave: EventEmitter

    isReady = false

    formatLines(lines) {
        if (lines && !Array.isArray(lines)) {
            try {
                lines = JSON.parse(lines)
            } catch (error) { }
        }

        return lines && Array.isArray(lines) ? lines : []
    }

    setEvents() {
        this.factory.on(`linecreated`, lineData => {
            this.linecreated.emit(lineData)
        })

        this.factory.on(`lineupdated`, (data) => {
            this.lineupdated.emit(data)
        })

        this.factory.on(`linemouseenter`, (data) => {
            this.linemouseenter.emit(data)
        })

        this.factory.on(`linemouseover`, (data) => {
            this.linemouseover.emit(data)
        })

        this.factory.on(`linemouseleave`, (data) => {
            this.linemouseleave.emit(data)
        })

        this.factory.on(`chartmouseover`, (data) => {
            this.chartmouseover.emit(data)
        })

        this.factory.on(`chartmouseoleave`, (data) => {
            this.chartmouseoleave.emit(data)
        })

        this.factory.getLines().forEach(line => this.linecreated.emit(line))
    }

    componentDidUpdate() {
        const formattedLines = this.formatLines(this.lines)
        let redraw = false

        if (formattedLines !== this._lines) {
            redraw = true
            this._lines = formattedLines
        }

        if (this._x !== this.x) {
            redraw = true
            this._x = this.x
        }

        if (this._xbars !== this.xbars) {
            redraw = true
            this._xbars = this.xbars
        }

        if (this._y !== this.y) {
            redraw = true
            this._y = this.y
        }

        if (this._ybars !== this.ybars) {
            redraw = true
            this._ybars = this.ybars
        }

        if (redraw) {
            this.factory.destroy()

            this.factory = factory({
                container: this.container,
                lines: formattedLines,
                x: this.x,
                xbars: this.xbars,
                y: this.y,
                ybars: this.ybars
            })

            this.setEvents()
        }
    }

    componentDidLoad() {
        const formattedLines = this.formatLines(this.lines)

        this._lines = formattedLines
        this._x = this.x
        this._xbars = this.xbars
        this._y = this.y
        this._ybars = this.ybars

        this.factory = factory({
            container: this.container,
            lines: formattedLines,
            x: this.x,
            xbars: this.xbars,
            y: this.y,
            ybars: this.ybars
        })

        this.setEvents()

        this.ready.emit()

        this.isReady = true
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container" > </div>
        )
    }
}
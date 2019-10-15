import timers from "../../global/timers"
import UnderlineState from "./state"
import HTML from "../../global/html"

class UnderlineElementFactory {
    private _state: UnderlineProperties
    public timeout
    public timer

    public set state(properties) {
        for (let p in properties) {
            this._state[p] = properties[p]
        }
    }

    public get state() {
        return this._state
    }

    public get underline() {
        return this.state
            .container
            .find(`.underline`)
    }

    constructor(properties) {
        this.setBindings()
        this._state = UnderlineState(properties, this.updatedProp)
        this.createUnderline()
        this.removeAddTargetEvents()

        const animate = this.animate.bind({ state: this })
        animate()
    }

    private setBindings() {
        this.updatedProp = this.updatedProp.bind(this)
        this.startEvent = this.startEvent.bind(this)
        this.endEvent = this.endEvent.bind(this)
    }

    private animate() {
        const that = this as any
        const container: HTMLModel = that.state.state.container
        const target: HTMLModel = that.target || container
        const underline: HTMLModel = that.state.underline

        if (!target || !target.element || !container || !underline) {
            const timer = that.state.timer

            if (typeof timer === `function`) {
                timer()
            }

            if (container) {
                container.removeClass(`active`)
            }

            return
        }

        const box = target.getDimensions()

        underline.style({
            width: `${box.width}px`,
            left: `${box.left}px`,
            top: `${box.bottom - 2}px`
        })
    }

    private createUnderline() {
        return HTML({ class: `underline` }, `span`).appendTo(this.state.container)
    }

    private startEvent(e) {
        if (this.timeout && typeof this.timeout === `function`) {
            this.timeout()
            this.timeout = undefined
        }

        const target = HTML(e.currentTarget)

        if (!target.element) {
            return
        }

        this.state.container.addClass(`active`)

        const animate = this.animate.bind({
            state: this,
            target: target
        })

        this.timer = timers.subscribe(`requestAnimationFrame`, animate)

        const underline = this.underline
        const box = target.element.getBoundingClientRect()
        let transformOrigin = `${e.x ? ((e.x - box.left) / box.width) * 100 : 50}% center`

        switch (this.state.direction) {
            case `toleft`:
                transformOrigin = `100% center`
                break;

            case `toright`:
                transformOrigin = `0% center`
                break
        }

        underline.style({ transformOrigin })

        if (!this.state.end) {
            const getTimer = () => this.timer
            const container = this.state.container

            this.timeout = timers.subscribe(`timeout`, {
                fn: () => {
                    const timer = getTimer()
                    if (typeof timer === `function`) { timer() }
                    if (container) { container.removeClass(`active`) }
                },
                time: this.state.speed * 1.5
            })
        }
    }

    public endEvent() {
        const timer = this.timer

        if (typeof timer === `function`) {
            timer()
        }

        this.state.container.removeClass(`active`)
    }

    private removeAddTargetEvents() {
        const targets = this.state.targets
        const start = this.state.start
        const end = this.state.end

        targets.forEach(target => {
            target.removeEventListener(start, this.startEvent)
            target.addEventListener(start, this.startEvent)

            if (end) {
                target.removeEventListener(end, this.endEvent)
                target.addEventListener(end, this.endEvent)
            }
        })
    }

    public updatedProp(key) {
        switch (key) {
            case `start`:
            case `end`:
            case `targets`:
                return this.removeAddTargetEvents()

            case `color`:
                this.underline
                    .style({ backgroundColor: this.state.color })

            case `opacity`:
                this.underline
                    .style({ opacity: this.state.opacity })

            case `speed`:
                this.underline
                    .style({
                        transition: `opacity ${this.state.speed}ms ease-in-out, transform ${this.state.speed * 1.3}ms ease-in-out, left ${this.state.speed * 1.3}ms ease-in-out`
                    })
        }
    }

    public update(properties) {
        this.state = properties
    }
}

export default UnderlineElementFactory
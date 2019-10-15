import dom from "../../global/dom"
import timers from "../../global/timers"

class RippleElementFactory {

    container: HTMLElement
    ripple: HTMLElement
    rippleInner: HTMLElement
    targets: HTMLElement[]
    target: HTMLElement | undefined
    startEventName: EventName
    endEventName: EventName
    _speed: number
    _opacity: number
    timer
    timeout
    _highlight = false

    public get highlight() {
        return this._highlight
    }

    public set highlight(bool) {
        this._highlight = bool
        this.container.classList[bool ? `add` : `remove`](`active`)
    }

    public get speed() {
        return this._speed
    }

    public set speed(speed) {
        speed = isNaN(speed) ? parseFloat(speed as any) : speed

        this._speed = Math.max(speed, 0)

        this.ripple.style.transition = `opacity ${this._speed}ms ease-in-out`
        this.rippleInner.style.transition = `transform ${this._speed * 1.3}ms ease-in-out`
    }

    public get opacity() {
        return this._opacity
    }

    public set opacity(opacity) {
        opacity = isNaN(opacity) ? parseFloat(opacity as any) : opacity
        opacity = Math.max(Math.min(opacity, 1), 0)

        this._opacity = opacity
        this.container.style.opacity = `${this._opacity}`
    }

    constructor(
        container: HTMLElement,
        targets: HTMLElement[],
        startEventName: EventName = `mouseenter`,
        endEventName: EventName | undefined = undefined,
        speed: number,
        opacity: number
    ) {
        this.setBindings()
        this.container = container
        this.ripple = dom.createAndAppend({ class: `ripple` }, `span`, this.container)
        this.rippleInner = dom.createAndAppend({ class: `ripple-inner` }, `span`, this.ripple)
        this.updateAttributes(targets, startEventName, endEventName, speed, opacity)
    }

    setBindings() {
        this.doCheck = this.doCheck.bind(this)
        this.addTarget = this.addTarget.bind(this)
        this.removeTarget = this.removeTarget.bind(this)
        this.addEventIn = this.addEventIn.bind(this)
        this.addEventOut = this.addEventOut.bind(this)
    }

    doCheck() {
        if (!this.container || !this.highlight || !this.target) {
            return this.addEventOut()
        }

        const box = this.target.getBoundingClientRect()
        this.ripple.style.width = `${box.width}px`
        this.ripple.style.height = `${box.height}px`
        this.ripple.style.left = `${box.left}px`
        this.ripple.style.top = `${box.top}px`
    }

    addEventIn(e) {
        if (this.timeout && typeof this.timeout === `function`) {
            this.timeout()
            this.timeout = undefined
        }

        this.timer = timers.subscribe(`requestAnimationFrame`, this.doCheck)

        this.highlight = true
        this.target = e.currentTarget
        this.container.classList.add(`active`)

        const box = this.target.getBoundingClientRect()

        const left = Math.min(
            Math.max(
                e.x ?
                    ((e.x - box.left) / box.width) * 100 :
                    50,
                20
            ), 80)

        const top = !e.y ? 0 : (e.y - box.top) - (box.width / 2)

        this.rippleInner.style.marginTop = `${top}px`
        this.rippleInner.style.transformOrigin = `${left}% 50%`;

        if (!this.endEventName) {
            this.timeout = timers.subscribe(`timeout`, { fn: this.addEventOut, time: this.speed * 1.2 })
        }
    }

    addEventOut() {
        this.highlight = false
        this.stopTimer()
        this.container.classList.remove(`active`)
        this.target = undefined
    }

    stopTimer() {
        if (typeof this.timer === `function`) {
            this.timer()
        }
    }

    addTarget(target) {
        target.addEventListener(this.startEventName, this.addEventIn, false)

        if (this.endEventName) {
            target.addEventListener(this.endEventName, this.addEventOut, false)
        }
    }

    addTargets(targets) {
        this.removeTargets()
        targets.forEach(this.addTarget)
    }

    removeTarget(target) {
        target.removeEventListener(this.startEventName, this.addEventIn, false)

        if (this.endEventName) {
            target.removeEventListener(this.endEventName, this.addEventOut, false)
        }
    }

    removeTargets() {
        this.targets.forEach(this.removeTarget)
        this.targets = []
    }

    updateAttributes(
        targets: HTMLElement[],
        startEventName: EventName = `mouseenter`,
        endEventName: EventName | undefined = undefined,
        speed: number = 400,
        opacity: number = 0.2
    ) {
        let changed = false

        if (startEventName !== this.startEventName) {
            this.startEventName = startEventName
            changed = true
        }

        if (endEventName !== this.endEventName) {
            this.endEventName = endEventName
            changed = true
        }

        if (targets !== this.targets) {
            this.targets = !!targets ? targets : [(this.container.parentNode as any).host.parentNode]
            changed = true
        }

        if (speed !== this.speed) {
            this.speed = speed
        }

        if (opacity !== this.opacity) {
            this.opacity = opacity
        }

        if (changed) {
            this.addTargets(targets)
        }
    }
}

export default RippleElementFactory
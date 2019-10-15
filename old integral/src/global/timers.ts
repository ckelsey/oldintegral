import get from "./get"
import partial from "./partial"
import curry from "./curry";

class Timers {
    animationFrame
    timeout = []
    subscriptions: GenericObject

    constructor() {
        this.subscriptions = {}
    }

    private runTimeout(fn, time) {
        return this.cancelTimeout(
            setTimeout(() => { fn() }, time)
        )
    }

    private cancelTimeout(timer) {
        cancelAnimationFrame(timer)
        timer = undefined
    }

    private runFrame() {
        if (!this.animationFrame) {
            this.animationFrame = requestAnimationFrame(() => {
                this.triggerEvent(`requestAnimationFrame`, undefined)
            })
        }
    }

    private cancelFrame() {
        cancelAnimationFrame(this.animationFrame)
        this.animationFrame = undefined
    }

    private initTimer(eventName: string, index?: number) {

        switch (eventName) {
            case `requestAnimationFrame`:
                if (this.subscriptions[eventName].length > 1) {
                    return
                }

                this.runFrame()

                return partial(curry(this.unsubscribe))
                    .set([this, eventName, index])
                    .curry

            case `timeout`:
                const data = this.subscriptions[eventName][index]

                if (data) {
                    return this.runTimeout(data.fn, data.time)
                }

                return () => { }

        }
    }

    private closeTimer(eventName: string) {

        switch (eventName) {
            case `requestAnimationFrame`:
                this.cancelFrame()

                if (this.subscriptions[eventName].length > 0) {
                    return this.runFrame()
                }
        }
    }

    private unsubscribe(_this, eventName, index) {
        if (!get(_this.subscriptions, `${eventName}.${index}`)) {
            return
        }

        _this.subscriptions[eventName].splice(index, 1)
    }

    public subscribe(eventName: string, data: Function | TimeOutData) {
        if (!this.subscriptions[eventName]) {
            this.subscriptions[eventName] = []
        }

        const index = this.subscriptions[eventName].length

        this.subscriptions[eventName].push(data)

        return this.initTimer(eventName, index)
    }

    private triggerEvent(eventName: string, data: any) {
        const fns = get(this.subscriptions, eventName, [])

        fns.forEach(subscription => subscription(data))

        this.closeTimer(eventName)
    }
}

export default new Timers()
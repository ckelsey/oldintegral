import Subscription from './subscription'

const loop = (subscriptions, key, value) => {
    Object.keys(subscriptions).forEach(id => {
        subscriptions[id][key](value)
    })
}

class Subject extends Subscription {
    state

    constructor(state) {
        super()
        this.state = state
    }

    get value() {
        return this.state
    }

    next(value) {
        if (typeof this.state === `function`) {
            return loop(this.subscriptions, `next`, this.state)
        }

        if (typeof value === `function`) {
            value = value(this.state)
        }

        this.state = value

        loop(this.subscriptions, `next`, this.state)
    }

    error(error) {
        loop(this.subscriptions, `error`, error)
    }

    complete() {
        loop(this.subscriptions, `complete`, undefined)
    }

    subscribe(next: Function, error?: Function, complete?: Function) {
        return super._subscribe(next, error, complete)
    }
}

export default Subject
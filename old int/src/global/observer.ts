import './typings'

class Observer implements ObserverClass {
    handler: ObserverObject
    isUnsubscribed: boolean
    id: string

    constructor(handler) {
        this.handler = handler
        this.isUnsubscribed = false
    }

    next(value) {
        if (this.handler.next && !this.isUnsubscribed) {
            this.handler.next(value)
        }
    }

    error(error) {
        if (!this.isUnsubscribed) {
            if (this.handler.error) {
                this.handler.error(error)
            }

            this.unsubscribe()
        }
    }

    complete() {
        if (!this.isUnsubscribed) {
            if (this.handler.complete) {
                this.handler.complete()
            }

            this.unsubscribe()
        }
    }

    unsubscribe() {
        this.isUnsubscribed = true
    }
}

export default Observer
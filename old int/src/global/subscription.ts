import Observer from './observer'
import './typings'

class Subscription implements SubscriptionObject {
    subscriptions = {}

    constructor() { }

    _subscribe(next: Function, error?: Function, complete?: Function): Function {

        const observer = new Observer(typeof next === `function` ? { next, error, complete } : next)
        const id = `${new Date().getTime()}_${Object.keys(this.subscriptions).length}_${Math.round(Math.random() * 10000)}`

        observer.id = id

        this.subscriptions[id] = observer

        return this._unsubscribe(observer)
    }

    _unsubscribe(observer: Observer): Function {
        return (): { [key: string]: Observer } => {
            observer.unsubscribe()
            this.subscriptions[observer.id] = null
            delete this.subscriptions[observer.id]
            return this.subscriptions
        }
    }
}

export default Subscription

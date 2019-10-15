import Subscription from "./subscription"
import Subject from "./subject"

/**
 * operators
 *      map
 *      concat
 *      filter
 *      scan
 *      take
 *      flatten
 * 
 * from
 * of
 * fromEvent
 */

import './typings'

class Observable extends Subscription implements ObservableObject {
    isSharing = false
    fn

    constructor(fn?: Function) {
        super()
        this.fn = fn
    }

    static merge(...observables: Array<Observable | Subject>) {
        return new Observable((observer) => {
            observables.forEach(observable => {
                observable.subscribe(observer.next)
            })
        })
    }

    static mergeObject(observables) {

        const state = {}

        Object.keys(observables).forEach((key) => {
            state[key] = observables[key].value
        })

        return new Observable((observer) => {
            Object.keys(observables).forEach((key) => {
                state[key] = observables[key].value

                observables[key].subscribe((value) => {
                    state[key] = value
                    observer.next({ state, changed: [key] })
                })
            })
        })
    }

    queue(time) {
        let lastTime = performance.now()
        let timer
        let queue = []

        return new Observable((observer) => {
            this.subscribe(val => {
                clearTimeout(timer)

                const now = performance.now()

                queue.push(val)

                if (now - lastTime >= time) {
                    observer.next(queue)
                    queue.length = 0
                    queue = []
                    lastTime = now
                    return
                }

                timer = setTimeout(() => {
                    observer.next(queue)
                    queue.length = 0
                    queue = []
                    return
                }, time)
            })
        })
    }

    static fromEvent(element: HTMLElement, eventName: string, preventDefault = false, stopPropagation = false) {
        return new Observable((observer) => {

            const handler = (event) => {

                if (preventDefault) {
                    event.preventDefault()
                }

                if (stopPropagation) {
                    event.stopPropagation()
                }

                observer.next(event)
            }

            element.addEventListener(eventName, handler, false)

            return () => {
                element.removeEventListener(eventName, handler, false)
            }
        })
    }

    subscribe(next: Function, error?: Function, complete?: Function) {
        const subscriptionCount = Object.keys(this.subscriptions).length
        const shouldRunFunction = typeof this.fn === `function` && (!this.isSharing || (this.isSharing && !subscriptionCount))

        const loop = (key: string, value?) => {
            return Object.keys(this.subscriptions).forEach(subscriptionKey => this.subscriptions[subscriptionKey][key](value))
        }

        const unsubscribe = super._subscribe(next, error, complete)

        if (shouldRunFunction) {
            this.fn({
                next: (value) => loop(`next`, value),
                error: (error) => loop(`error`, error),
                complete: () => loop(`complete`)
            })
        }

        return unsubscribe
    }

    share() {
        this.isSharing = true
        return this
    }
}

export default Observable
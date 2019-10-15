import Observable from './observable'
import partial from './partial'
import Subject from './subject'

/**
 * TODO
 * Allow free vars, get rid of the partials
 */
const isFocused: Subject = new Subject(true)

window.onfocus = () => {
    isFocused.next(true)
}

window.onpageshow = () => {
    isFocused.next(true)
}

window.onblur = () => {
    isFocused.next(false)
}

window.onpagehide = () => {
    isFocused.next(false)
}

document.addEventListener(`visibilitychange`, () => {
    isFocused.next(!isFocused.value)
})

const Stats = (
    config: StatsConfig = {
        partial: partial,
        observableClass: Observable,
        objectKeysFn: Object.keys,
        timerFn: window.requestAnimationFrame,
        roundFn: Math.round,
        getUsedMemoryFn: () => (performance as any).memory.usedJSHeapSize,
        getTotalMemoryFn: () => (performance as any).memory.totalJSHeapSize,
        getTimeFn: () => new Date().getTime()
    }
) => {

    const fps$ = new config.observableClass((observer: ObserverObject) => {

        const subscriberCount = () =>
            config
                .objectKeysFn(fps$.subscriptions)
                .length

        const cycle = (
            data: {
                lastTime: number,
                totalTime: number,
                run: any,
                config: any,
                observer: any
            }
        ) => {
            const now = data.config.getTimeFn()
            const duration = now - data.lastTime
            const fps = data.config.roundFn(1000 / duration)
            const start = data.totalTime
            const end = data.totalTime + duration


            data.totalTime = end
            data.lastTime = now

            data.observer.next({
                fps,
                start,
                end,
                memoryUsed: config.getUsedMemoryFn(),
                memoryTotal: config.getTotalMemoryFn()
            })

            if (!document.hasFocus()) {
                isFocused.next(false)
            }

            data.run.curry(data)
            // if (isFocused.value) {
            //     data.run.curry(data)
            // } else {
            //     const waitFoFocus = isFocused.subscribe(val => {
            //         if (val) {
            //             data.run.curry(data)
            //             waitFoFocus()
            //         }
            //     })
            // }
        }

        const run = config.partial(
            _cycle => getSubscribes => (data) => {
                if (!getSubscribes()) { return }

                return data.config.timerFn.call(null,
                    () => _cycle(data)
                )
            }
        ).set([
            cycle,
            subscriberCount
        ])

        if (subscriberCount()) {
            run.curry({
                lastTime: config.getTimeFn(),
                totalTime: 0,
                run,
                config,
                observer
            })
        }
    }).share()

    return fps$
}

interface getNumberFn {
    (): number
}

interface getNumberValueFn {
    (number): number
}

interface getMemoryFn {
    (): number
}

interface timerFn {
    (fn: Function, time?: number)
}

interface objectKeysFn {
    (any): any[]
}

interface StatsConfig {
    partial: typeof partial
    observableClass: typeof Observable
    objectKeysFn: objectKeysFn
    timerFn: timerFn
    roundFn: getNumberValueFn
    getUsedMemoryFn: getMemoryFn
    getTotalMemoryFn: getMemoryFn
    getTimeFn: getNumberFn
}

export default Stats

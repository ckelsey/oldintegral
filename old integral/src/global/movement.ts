import Observable from "./observable"
import dom from "./dom"
import partial from "./partial"

const dragX$ = (
    element,
    preventDefault = false,
    stopPropagation = false,
    onMouseDown = e => e,
    onMouseUp = e => e
) => {

    const userSelectStyle = dom.setStyle(document.body)(`user-select`)
    const addClass = partial(dom.addClass).set([element, `grabbing`]).curry
    const removeClass = partial(dom.removeClass).set([element, `grabbing`]).curry

    return new Observable((observer) => {
        Observable.fromEvent(element, `mousedown`, preventDefault, stopPropagation)
            .subscribe(e => {
                onMouseDown(e)

                userSelectStyle(`none`)
                addClass()

                const mouseMove = Observable.fromEvent(window as any, `mousemove`, preventDefault, stopPropagation)
                    .subscribe(moveEvent => {

                        const newX = moveEvent.movementX

                        if (newX === 0) {
                            return
                        }

                        observer.next(newX)
                    })

                const stop = Observable.merge(

                    Observable.fromEvent(window as any, `mouseup`, preventDefault, stopPropagation),
                    Observable.fromEvent(window as any, `mouseleave`, preventDefault, stopPropagation)

                ).subscribe((e) => {

                    onMouseUp(e)

                    userSelectStyle(undefined)
                    removeClass()

                    mouseMove()
                    stop()
                })
            })
    })
}

const over$ = (
    element,
    preventDefault = false,
    stopPropagation = false,
    onMouseOver = e => e,
    onMouseOut = e => e
) => {

    return new Observable((observer) => {
        Observable.fromEvent(element, `mouseenter`, preventDefault, stopPropagation)
            .subscribe(e => {
                onMouseOver(e)

                const mouseMove = Observable.fromEvent(window as any, `mousemove`, preventDefault, stopPropagation)
                    .subscribe(moveEvent=>{
                        observer.next({
                            windowX: moveEvent.screenX,
                            windowY: moveEvent.screenY,
                            elementX: moveEvent.screenX - element.getBoundingClientRect().left,
                            elementY: moveEvent.screenY - element.getBoundingClientRect().top
                        })
                    })

                const stop = Observable.merge(

                    Observable.fromEvent(element, `mouseleave`, preventDefault, stopPropagation),
                    Observable.fromEvent(window as any, `mouseup`, preventDefault, stopPropagation),
                    Observable.fromEvent(window as any, `mouseleave`, preventDefault, stopPropagation)

                ).subscribe((e) => {
                    onMouseOut(e)
                    mouseMove()
                    stop()
                })
            })
    })
}

export default {
    dragX$,
    over$
}
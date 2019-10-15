import Observable from "./observable";

const dragX$ = element => {
    return new Observable((observer)=>{
        Observable.fromEvent(element, `mousedown`).subscribe(e => {
            let lastX = e.x

            const mouseMove = Observable.fromEvent(window as any, `mousemove`)
                .subscribe(moveEvent => {
                    observer.next(lastX - moveEvent.x)
                    lastX = moveEvent.x
                })

            const stop = Observable.merge(
                Observable.fromEvent(window as any, `mouseup`),
                Observable.fromEvent(window as any, `mouseleave`)
            ).subscribe(() => {
                mouseMove()
                stop()
            })
        })
    })
}

export default dragX$
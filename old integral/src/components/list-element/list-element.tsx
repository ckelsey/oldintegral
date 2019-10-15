import { Component, Event, EventEmitter, Prop, Method } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'list-element',
    styleUrl: 'style.scss',
    shadow: true
})

export class ListElement {
    @Method()
    async push(item) {
        return Promise.resolve(this.factory.push(item))
    }

    @Method()
    async pop() {
        return Promise.resolve(this.factory.pop())
    }

    @Method()
    async shift() {
        return Promise.resolve(this.factory.shift())
    }

    @Method()
    async unshift(item) {
        return Promise.resolve(this.factory.unshift(item))
    }

    @Method()
    async splice(index, item, count = 0) {
        return Promise.resolve(this.factory.splice(index, count, item))
    }

    @Method()
    set(items: ListItem[]) {
        this.factory.set(items)
    }

    @Method()
    public async isReady() {
        return this._isReady
    }


    public _isReady = false
    private factory
    private container: HTMLElement

    @Prop()
    items: ListItem[]

    @Prop()
    underline: string

    @Prop()
    ripple: string

    @Prop()
    search: boolean | Function

    @Event({ bubbles: false, composed: false })
    ready: EventEmitter

    @Event({ bubbles: false, composed: false })
    whenclick: EventEmitter

    clicked(data) {
        this.whenclick.emit(data)
    }

    componentDidUpdate() {
        this.factory.update(this.container, this.items, this.clicked, this.underline, this.ripple, this.search)
    }

    componentDidLoad() {
        this.clicked = this.clicked.bind(this)

        this.factory = new factory(this.container, this.items, this.clicked, this.underline, this.ripple, this.search)

        this.ready.emit()

        this._isReady = true
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container" > </div>
        )
    }
}
import { Component, Prop, Event, EventEmitter } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'ripple-element',
    styleUrl: 'style.scss',
    shadow: true
})

export class RippleElement {
    @Prop()
    public start: EventName

    @Prop()
    public end: EventName

    @Prop()
    public targets: HTMLElement[]

    @Prop()
    public speed: number

    @Prop()
    public opacity: number

    @Event({ bubbles: false, composed: false })
    ready: EventEmitter

    public container: HTMLElement
    public factory
    public isReady = false

    componentDidUpdate() {
        this.factory.updateAttributes(this.start, this.end, this.targets, this.speed, this.opacity)
    }

    componentDidLoad() {
        this.factory = new factory(this.container, this.targets, this.start, this.end, this.speed, this.opacity)

        this.ready.emit()

        this.isReady = true
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container" > </div>
        )
    }
}
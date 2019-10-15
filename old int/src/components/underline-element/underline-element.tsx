import { Component, Prop, Event, EventEmitter } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'underline-element',
    styleUrl: 'style.scss',
    shadow: true
})

export class UnderlineElement {
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

    @Prop()
    public direction: EventName

    @Prop()
    public color: EventName

    @Event({ bubbles: false, composed: false })
    ready: EventEmitter

    public container: HTMLElement
    public factory
    public isReady = false

    private get properties(){
        return {
            start: this.start,
            end: this.end,
            targets: this.targets,
            speed: this.speed,
            opacity: this.opacity,
            container: this.container,
            color: this.color,
            direction: this.direction
        }
    }

    componentDidUpdate() {
        this.factory.updateAttributes(this.properties)
    }

    componentDidLoad() {
        this.factory = new factory(this.properties)

        this.ready.emit()

        this.isReady = true
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container" > </div>
        )
    }
}
import { Component, Prop, Event, EventEmitter } from '@stencil/core'
import factory from './documentation-item-factory'

@Component({
    tag: 'documentation-item',
    styleUrl: 'style.scss',
    shadow: true
})

export class DocumentationItem {
    @Prop() item: string

    @Event({ bubbles: false, composed: false}) ready: EventEmitter

    container: HTMLElement
    factory

    isReady = false

    componentDidLoad() {
        this.factory = factory({
            container: this.container
        })

        this.ready.emit()

        this.isReady = true
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container" > </div>
        )
    }
}
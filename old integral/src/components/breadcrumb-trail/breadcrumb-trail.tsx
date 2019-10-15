import { Component, Prop, Event, EventEmitter } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'breadcrumb-trail',
    styleUrl: 'style.scss',
    shadow: true
})

export class BreadcrumbTrail {
    @Prop()
    path: string = ``

    @Prop()
    wrap: boolean = false

    @Event({ bubbles: false, composed: false }) ready: EventEmitter
    @Event({ bubbles: false, composed: false }) whenclick: EventEmitter

    container: HTMLElement
    factory
    _path

    isReady = false

    componentDidUpdate() {
        this.factory.updateAttributes(this.path, this.wrap)
    }

    componentDidLoad() {
        this.factory = new factory({
            container: this.container,
            whenclick: data => this.whenclick.emit(data),
            path: this.path,
            wrap: this.wrap
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
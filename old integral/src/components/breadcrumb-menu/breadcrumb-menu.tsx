import { Component, Event, EventEmitter, Prop } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'breadcrumb-menu',
    styleUrl: 'style.scss',
    shadow: true
})

export class BreadcrumbMenu {
    @Prop()
    menu: string | MenuData[]

    @Prop()
    search: boolean = false

    @Prop()
    wrapBreadcrumbs: boolean = false

    @Event({ bubbles: false, composed: false }) ready: EventEmitter
    @Event({ bubbles: false, composed: false }) whennavigate: EventEmitter
    @Event({ bubbles: false, composed: false }) whenopen: EventEmitter

    container: HTMLElement
    factory

    isReady = false

    public open() {

    }

    public goto() {

    }

    public back() {

    }

    private onBreadcrumbClick(data) {
        this.whennavigate.emit(data)
    }

    private onItemClick(data) {
        this.whenopen.emit(data)
    }

    componentDidUpdate() {
        this.factory.updateAttributes(this.menu, this.wrapBreadcrumbs, this.search)
    }

    componentDidLoad() {
        this.onBreadcrumbClick = this.onBreadcrumbClick.bind(this)
        this.onItemClick = this.onItemClick.bind(this)

        this.factory = new factory({
            container: this.container,
            menu: this.menu,
            wrapBreadcrumbs: this.wrapBreadcrumbs,
            onItemClick: this.onItemClick,
            onBreadcrumbClick: this.onBreadcrumbClick,
            search: this.search
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
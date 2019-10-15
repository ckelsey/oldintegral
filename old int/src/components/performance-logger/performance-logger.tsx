import { Component, Prop } from '@stencil/core'
import MakePerformanceLogger from './factory'


@Component({
    tag: 'performance-logger',
    styleUrl: 'performance-logger.scss',
    shadow: true
})

export class PerformanceLogger {
    @Prop() timeout: number
    container: HTMLElement
    factory

    componentDidLoad() {
        this.factory = MakePerformanceLogger({
            container: this.container,
            timeout: this.timeout || 10001
        })
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container"></div>
        )
    }
}
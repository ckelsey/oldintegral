import { Component, Prop, Event, EventEmitter } from '@stencil/core'
import factory from './factory'

@Component({
    tag: 'documentation-element',
    styleUrl: './style.scss',
    shadow: true
})

export class DocumentationElement {
    @Prop() jsonUrl: string
    @Prop() json: string

    @Event({ bubbles: false, composed: false}) ready: EventEmitter

    container: HTMLElement
    factory

    isReady = false

    load(json){
        this.factory = new factory({
            container: this.container,
            json
        })

        this.ready.emit()

        this.isReady = true
    }

    componentDidLoad() {
        
        if(this.jsonUrl){
            
            const xhr = new XMLHttpRequest()
            xhr.open(`GET`, this.jsonUrl)
            xhr.addEventListener(`load`, ()=>{
                try {
                    this.load(JSON.parse(xhr.responseText))
                } catch (error) {
                    /**TODO HANDLE ERROR */
                }
            })
            
            return xhr.send()
        }

        /** TODO handle json as json string */
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el} class="container" > </div>
        )
    }
}
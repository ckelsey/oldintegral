import { Component, Prop, Event, EventEmitter } from '@stencil/core'
import Factory from './factory'
import HTML from '../../global/html'

@Component({
    tag: 'input-field',
    styleUrl: 'style.scss',
    shadow: true
})

export class InputField {
    @Prop()
    public type: string

    @Prop()
    public label: string

    @Prop()
    public labelPosition: any

    @Prop()
    public options: any[]

    @Prop()
    public value: any

    @Prop()
    public showIcon: any

    @Prop()
    public iconUrl: string

    @Prop()
    public showClear: boolean

    @Prop()
    public errorMessage: string

    @Prop()
    public helpMessage: string

    @Prop()
    public showCount: boolean

    @Prop()
    public multiline: boolean

    @Prop()
    public max: number | undefined

    @Prop()
    public min: number | undefined

    @Prop()
    public step: number | undefined

    @Prop()
    public required: boolean

    @Prop()
    public validator: Function | undefined

    @Prop()
    public placeholder: string

    @Prop()
    public autocomplete: string

    @Prop()
    public autofocus: boolean

    @Prop()
    public disabled: boolean

    @Prop()
    public name: string

    @Prop()
    public readonly: boolean

    @Prop()
    public tabindex: number

    @Event({ bubbles: false, composed: false })
    public ready: EventEmitter

    public container: HTMLElement
    public isReady = false

    public set Factory(properties: InputFieldProperties) {
        if (!this.factory.State.id) {
            this.factory = Object.assign(this.factory, new Factory(properties))
            return
        }

        this.factory.update(this.properties)
    }

    public get Factory() {
        return this.factory
    }

    public factory: InputFieldFactory = {
        State: {},
        ContainerClasses: {},
        InputClasses: {},
        InputName: ``,
        update: () => { },
        updatedProp: () => { },
        onInput: () => { },
        onBlur: () => { },
        onMouseUp: () => { }
    }

    public get properties(): InputFieldProperties {
        return {
            container: HTML(this.container),
            value: this.value,
            type: this.type,
            label: this.label,
            labelPosition: this.labelPosition,
            placeholder: this.placeholder,
            options: this.options,
            showIcon: this.showIcon,
            iconUrl: this.iconUrl,
            showClear: this.showClear,
            errorMessage: this.errorMessage,
            helpMessage: this.helpMessage,
            showCount: this.showCount,
            multiline: this.multiline,
            max: this.max,
            min: this.min,
            step: this.step,
            required: this.required,
            validator: this.validator,
            autocomplete: this.autocomplete,
            autofocus: this.autofocus,
            disabled: this.disabled,
            name: this.name,
            readonly: this.readonly,
            tabindex: this.tabindex
        }
    }

    componentDidUpdate() {
        this.Factory = this.properties
    }

    componentDidLoad() {
        this.Factory = this.properties
        this.ready.emit()
        this.isReady = true
    }

    render() {
        return (
            <div ref={(el: HTMLElement) => this.container = el}></div>
        )
    }

    constructor(){
        console.log(`q`)
    }
}
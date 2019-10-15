import inputState from "./state"
import utils from "../../global/utils"
// import Type from "../../global/type"
import render from "./dom"
import Template from "../../global/template";

class InputFieldFactory implements InputFieldFactory {
    private _state: InputFieldProperties

    constructor(properties: InputFieldProperties) {
        this._state = inputState(Object.assign(
            properties,
            { id: utils.getId(`input-field`) }
        ), this.updatedProp)

        Template.render(render(), this._state.container, this)

        // for(let p in this.State){
        //     console.log(p, this.State[p])
        // }

        // requestAnimationFrame(()=>{
        //     this.State = {ready:true}
        // })
    }

    public updatedProp(key, val) {
        console.log(key, val)
    }

/*
    public set State(properties: InputFieldProperties) {
        for (let p in properties) {
            this._state[p] = properties[p]
        }
    }

    public get State(): InputFieldProperties {
        return this._state
    }

    public get Input() {
        return this.State
            .container
            .find(`input`)
    }

    public get hasValue() {
        const Input = this.Input

        console.log(Input)

        if (!Input){
            return false
        }

        const val = Input.getAttribute(`value`)
        const isEmptyString = val === ``
        const isEmpty = Type.empty(val)
        const autoFilled = Input.isAutoFilled()
        const focused = Input.isFocused()
        return (!isEmpty && !isEmptyString) || autoFilled || focused
    }

    public get ContainerClasses() {
        return {
            container: true,
            active: this.hasValue,
        }
    }

    public get InputClasses() {
        return {
            active: this.State.ready,
            'has-value': this.hasValue,

        }
    }

    public get InputName() {
        return !Type.empty(this.State.name) ? this.State.name : this.State.type
    }

    public updatedProp(key, val) {
        console.log(key, val)
    }

    public update(properties: InputFieldProperties) {
        console.log(`update`, properties)
        this.State = properties
        return this.State
    }

    public onInput(event: Event) {
        console.log(event)
    }

    public onBlur(event: Event) {
        console.log(event)
    }

    public onMouseUp(event: Event) {
        console.log(event)
    }
*/
    /*
    private setBindings() {
        this.updatedProp = this.updatedProp.bind(this)
        this._onInput = this._onInput.bind(this)
    }

    public updatedProp(key, val) {
        switch (key) {
            case `label`:
                this.html
                    .Label
                    .setHtml(val)
                break
            case `labelPosition`:
                this.State
                    .container
                    .addClass(`label-${this.State.labelPosition}`)
                break
            case `type`:
            case `value`:
            case `required`:
            case `placeholder`:
            case `max`:
            case `min`:
            case `step`:
                this.html
                    .Input
                    .setAttribute(key, val)
        }
    }

    

    public _onInput(data) {

        this.State.onInput(data)
    }
    */
}

export default InputFieldFactory
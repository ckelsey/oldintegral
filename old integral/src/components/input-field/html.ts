import HTML from "../../global/html"
import Type from "../../global/type"

class InputFieldHtml {

    constructor(state) {
        this.setBindings(state)
        this.createInput(state)
        this.createLabel(state)
        this.createMessage(state)

        state.container.addClass(`label-${state.labelPosition}`)

        requestAnimationFrame(() => {
            state.container.addClass(`ready`)
        })
    }

    private State(): any {
        return this
    }

    public set errorMessage(message) {
        const messageElement = this.Messages
        const existingMessage = messageElement.getAttribute(`data-content`)
        const helpMessage = messageElement.getAttribute(`message`)

        if (message === undefined) {
            if (helpMessage === existingMessage) {
                return
            }
        } else {
            if (message === existingMessage) {
                return
            }
        }

        const updateContent = (m) => {
            setTimeout(() => {
                messageElement
                    .setAttribute(`data-content`, m)
                    .removeClass(`transitioning`)
            }, 200)
        }


        messageElement.addClass(`transitioning`)

        if (message === undefined) {
            messageElement.removeClass(`error`)
            updateContent(messageElement.getAttribute(`message`))
            return
        }

        messageElement.addClass(`error`)
        updateContent(message)
    }

    public get Label() {
        return this.State()
            .container
            .find(`label .label`)
    }

    public get LabelOuter() {
        return this.State()
            .container
            .find(`label`)
    }

    public get LabelInner() {
        return this.State()
            .container
            .find(`label .label-inner`)
    }

    public get Messages() {
        return this.State()
            .container
            .find(`.messages`)
    }

    public get Value() {
        return this.hasValue()
    }

    public get Input() {
        return this.State()
            .container
            .find(`input`)
    }

    private setBindings(state) {
        this.State = this.State.bind(state)
        this.onInput = this.onInput.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
    }

    private inputAttributes(state) {
        const attributes: any = {
            type: state.type,
            tag: `input`,
            id: state.id,
            value: !Type.empty(state.value) ? state.value : ``,
            class: !Type.empty(state.value) ? `has-value` : ``,
            name: !Type.empty(state.name) ? state.name : state.type
        }

        if (!!state.required) { attributes.required = true }

        if (!Type.empty(state.placeholder)) {
            attributes.placeholder = state.placeholder
        }

        if (!Type.empty(state.max)) {
            attributes.max = state.max
        }

        if (!Type.empty(state.min)) {
            attributes.min = state.min
        }

        if (!Type.empty(state.step)) {
            attributes.step = state.step
        }

        if (!Type.empty(state.autocomplete)) {
            attributes.autocomplete = state.autocomplete
        }

        if (!Type.empty(state.tabindex)) {
            attributes.tabindex = state.tabindex
        }

        if (!Type.empty(state.readonly) && state.readonly) {
            attributes.readonly = `${state.readonly}`
        }

        if (!Type.empty(state.disabled)) {
            attributes.disabled = state.disabled
        }

        if (!Type.empty(state.autofocus)) {
            attributes.autofocus = state.autofocus
        }

        if (!!state.multiline) {
            attributes.tag = `textarea`
        }

        if (state.type === `select`) {
            attributes.tag = `select`

            if (!!state.multiline) {
                attributes.multiple = true
            }
        }

        return attributes
    }

    private hasValue() {
        const val = this.Input.getAttribute(`value`, true)
        const isEmptyString = val === ``
        const isEmpty = Type.empty(val)
        const autoFilled = this.Input.isAutoFilled()
        const focused = this.Input.isFocused()

        if ((!isEmpty && !isEmptyString) || autoFilled || focused) {
            this.Input.addClass(`has-value`)
            this.State().container.addClass(`active`)
        } else {
            this.Input.removeClass(`has-value`)
            this.State().container.removeClass(`active`)
        }

        return val
    }

    private onInput(e) {
        this.State()._onInput({ event: e, value: this.Value })
        this.checkValidity(true)
    }

    private checkValidity(onlyHideMessage = false) {
        const valid = this.Input.isValid()

        if (valid) {
            this.Input.removeClass(`invalid`)
            this.errorMessage = undefined
        }

        if (!valid && !onlyHideMessage) {
            this.Input.addClass(`invalid`)

            switch (this.Input.getAttribute(`type`).toLowerCase().trim()) {
                case `email`:
                    this.errorMessage = `please enter a valid email`
                    break
            }
        }
    }

    private onBlur() {
        this.hasValue()
        this.checkValidity()
    }

    private onMouseUp() {
        this.hasValue()
    }

    private createInput(state) {
        const inputContainer = HTML({ class: `input-container` }, `div`)
            .appendTo(state.container)

        const input = HTML(this.inputAttributes(state), `input`)
            .appendTo(inputContainer)
            .addEvent(`input`, this.onInput)
            .addEvent(`blur`, this.onBlur)
            .addEvent(`mouseup`, this.onMouseUp)
            .addEvent(`touchend`, this.onMouseUp)

        inputContainer.append(HTML({
            start: `focus`,
            end: `blur`,
            targets: [input.element],
            opacity: 0.8,
            speed: 333
        }, `underline-element`))


        requestAnimationFrame(() => {
            input.addClass(`ready`)
        })
    }

    private createLabel(state) {
        if (!state.label) { return }

        const label = HTML({ for: state.id, position: state.labelPosition }, `label`)
            .append(
                HTML({ class: `label-inner` }, `span`)
                    .append(
                        HTML({ class: `label` }, `span`)
                            .setHtml(state.label)
                    )
            )

            .appendTo(state.container)

        requestAnimationFrame(() => {
            label.addClass(`ready`)
        })
    }

    private createMessage(state) {
        const message = Type.empty(state.helpMessage) ? `` : state.helpMessage
        HTML({ class: `messages`, message, "data-content": message }, `div`)
            .appendTo(state.container)
    }
}

export default InputFieldHtml
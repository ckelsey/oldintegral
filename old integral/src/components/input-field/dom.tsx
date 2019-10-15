export default (): VirtualDom => {

    return (
        <div class="inner-container">
            <div class="input-container">
                <input
                    data--type="State.type"
                    data--id="State.id"
                    data--class="InputClasses"
                    data--name="InputName"
                    data--value="State.value"
                    data--required="State.required"
                    data--placeholder="State.placeholder"
                    data--max="State.max"
                    data--min="State.min"
                    data--step="State.step"
                    data--autocomplete="State.autocomplete"
                    data--tabindex="State.tabindex"
                    data--readonly="State.readonly"
                    data--disabled="State.disabled"
                    data--autofocus="State.autofocus"
                    data--onInput="onInput"
                    data--onBlur="onBlur"
                    data--onMouseUp="onMouseUp"
                ></input>
                <div class="psuedo-input"></div>
            </div>
        </div>
    ) as VirtualDom
}

class State {
    state
    lastUpdate

    constructor(defaultValue) {
        this.value = defaultValue
    }

    set value(newState){
        this.state = this.processValue(newState)
        this.lastUpdate = performance.now()
    }

    get value() {
        return this.state
    }

    // get previous() {
    //     return this.states[this.index - 1]
    // }

    // get index() {
    //     return this.states.length - 1
    // }

    private processValue(value) {
        if(Array.isArray(value)){
            value = value.slice(0)
        }else if (typeof value === `function`){
            value = value(this.value)
        }else if (typeof value === 'object' && value !== null){
            value = Object.assign({}, value)
        }

        return value
    }

    update(newState){
        this.value = this.processValue(newState)
        return this
    }

    // concat(newState) {
    //     this.states.push(
    //         [].concat(
    //             this.states[this.index],
    //             this.processValue(newState)
    //         )
    //     )

    //     this.updateLastUpdate()

    //     return this
    // }

    // push(newState) {
    //     this.states.push(this.processValue(newState))
    //     this.updateLastUpdate()
    //     return this
    // }

    // replace(newState){
    //     this.states = [this.processValue(newState)]
    //     this.updateLastUpdate()
    //     return this
    // }

    // pop() {
    //     this.states.pop()
    //     this.updateLastUpdate()
    //     return this
    // }

    // reset() {
    //     this.states = [this.states[0]]
    //     this.updateLastUpdate()
    //     return this
    // }

    // flush() {
    //     this.states = [this.value]
    //     this.updateLastUpdate()
    //     return this
    // }
}

export default State
import partial from './partial';

const logs = {}
const queue = []
const logUpdates = []
const instanceIDS = []
const dawn = new Date().getTime()

const getId = partial(INT => IDS => instance => {
    const getID = (_id?) => {
        return `${instance.constructor.name}_${_id ? INT(_id.split(`_`)[_id.split(`_`).length - 1]) + 1 : 0}`
    }

    let id = getID()

    while (IDS.indexOf(id) > -1) {
        id = getID(id)
    }

    IDS.push(id)

    return id

}).set([
    parseInt,
    instanceIDS
]).curry

const parseTrace = (ERROR)=> {
    return new ERROR().stack
        .split(`\n`)
        .map(str => {
            if (str.indexOf(`at Logger.`) > -1) {
                return undefined
            }

            const trace = str.split(`at `)
            trace.shift()

            return trace.join(`at `)
        })
        .filter(el => {
            if (el === null || el === undefined || el === ``) {
                return false
            }

            return true
        })
        .map(str => {
            const parts = str.split(/ \((.*)\)/)
            return {
                function: parts[0],
                file: parts[1]
            }
        })
}

const LOGGER = ERROR => GETTIMEFN => ROUNDFN => RANDOMFN => GETID => QUEUE => LOGS => LOGUPDATES => PARSETRACE => {
    return {
        dawn,

        init(instance) {
            instance.instanceID = GETID(instance)
        },

        addToQueue(log) {
            QUEUE.push(log)
        },

        start(source, message) {
            if (!source || !source.instanceID) {
                return {}
            }

            if (!LOGS[source.instanceID]) {
                LOGS[source.instanceID] = {
                    color: `hsl(${ROUNDFN(RANDOMFN() * 360)}, ${ROUNDFN(RANDOMFN() * 100)}%, 50%)`,
                    data: []
                }
            }

            const data = {
                message,
                start: GETTIMEFN(),
                id: source.instanceID,
                trace: PARSETRACE(ERROR),
                duration: 1,
                index: 0,
                hasEnded: false
            }

            QUEUE.push(data)
            LOGUPDATES.push(data)

            return data
        },

        end(log) {
            log.duration = GETTIMEFN() - log.start
            log.hasEnded = true

            LOGUPDATES.push(log)
        }
    }
}

const Logger = LOGGER
    (Error)
    (() => new Date().getTime())
    (Math.round)
    (Math.random)
    (getId)
    (queue)
    (logs)
    (logUpdates)
    (parseTrace)


export default Logger

/*

class Logger {
    logs
    queue
    dawn
    fps
    instanceIDS
    FPS
    logUpdates

    constructor() {
        this.logUpdates = []
        QUEUE = []
        this.FPS = FPS()
        this.dawn = new Date().getTime()
        LOGS = {}
        this.instanceIDS = []
    }

    parseTrace() {
        return new Error().stack
            .split(`\n`)
            .map(str => {
                if (str.indexOf(`at Logger.`) > -1) {
                    return undefined
                }

                const trace = str.split(`at `)
                trace.shift()

                return trace.join(`at `)
            })
            .filter(el => {
                if (el === null || el === undefined || el === ``) {
                    return false
                }

                return true
            })
            .map(str => {
                const parts = str.split(/ \((.*)\)/)
                return {
                    function: parts[0],
                    file: parts[1]
                }
            })
    }

    getID(instance) {
        const getID = (_id?) => {
            return `${instance.constructor.name}_${_id ? parseInt(_id.split(`_`)[_id.split(`_`).length - 1]) + 1 : 0}`
        }

        let id = getID()

        while (this.instanceIDS.indexOf(id) > -1) {
            id = getID(id)
        }

        this.instanceIDS.push(id)

        return id
    }

    init(instance) {
        instance.instanceID = this.getID(instance)
    }

    addToQueue(log){
        QUEUE.push(log)
    }

    start(source, message) {
        if (!source || !source.instanceID) {
            return {}
        }

        if (!LOGS[source.instanceID]) {
            LOGS[source.instanceID] = {
                color: `hsl(${ROUNDFN(RANDOMFN() * 360)}, ${ROUNDFN(RANDOMFN() * 100)}%, 50%)`,
                data: []
            }
        }

        const fps = this.FPS.fps

        const data = {
            message,
            start: new Date().getTime(),
            id: source.instanceID,
            startFPS: fps,
            endFPS: fps,
            trace: this.parseTrace(),
            duration: 1,
            index: 0,
            hasEnded: false
        }

        QUEUE.push(data)
        this.logUpdates.push(data)

        return data
    }

    end(log) {
        log.duration = new Date().getTime() - log.start
        log.endFPS = this.FPS.fps
        log.hasEnded = true

        this.logUpdates.push(log)
    }
}

export default Logger
*/
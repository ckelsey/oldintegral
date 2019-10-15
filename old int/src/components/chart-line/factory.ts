import html from "./html"
import formatLine from "./line"

const factory = (config: Config) => {

    config.subscriptions = Object.assign(config.subscriptions ? config.subscriptions : {}, {})

    config.triggerSubscriptions = (event, data?) => {
        if (!config.subscriptions[event]) { return }

        if (event === `linehighlight`) {
            lines.forEach(line => line.unhighlight())
        }
        config.subscriptions[event].forEach(fn => fn(data))
    }

    const elements = html(config)
    const lineFormatter = formatLine(config)(elements.svg)
    let lines = config.lines.splice(0).map(lineFormatter)

    return {
        elements,

        getLine: index => {
            if (!lines[index]) {
                return
            }

            return lines[index]
        },

        getLines: () => {
            const array: any = lines

            array.set = newLines => {

                if (!Array.isArray(newLines)) {
                    return
                }

                lines.forEach(line => line.remove())

                lines = newLines.map(lineFormatter)

                return lines
            }

            array.add = line => {
                lines.push(lineFormatter(line))
                return lines
            }

            array.remove = index => {
                if (!lines[index]) {
                    return
                }

                lines.splice(index, 1)[0].remove()

                return lines
            }

            return array
        },

        destroy: () => {
            elements.container.innerHTML = ``
        },

        on: (event, fn) => {
            if (!config.subscriptions[event]) {
                config.subscriptions[event] = []
            }

            config.subscriptions[event].push(fn)
        }
    }
}

export default factory
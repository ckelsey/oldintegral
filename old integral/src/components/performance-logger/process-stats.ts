import partial from "../../global/partial"
import using from "../../global/using"
import utils from "../../global/utils"
import dom from "../../global/dom"

const memoryKeys = data => Object.keys(data)
    .filter(key => key.indexOf(`memory`) > -1)


const byteToMegabyteObject = data => key => ({
    [key]: Math.round(utils.conversion.b2Mb(data[key]))
})

const extractAndConverMemory = data => using(memoryKeys(data))
    .map(byteToMegabyteObject(data))
    .flattenObjectArray()
    .value()

const assignPropertyPartial = partial(key => value => data =>
    using(data)
        .do(current => Object.assign(
            current,
            { [key]: value }
        ))
        .value()
)

const findElement = selectorString => parent => dom.findElement(parent, selectorString)

const findOrMakeElement = selectorString => attributes => tag => parent =>
    partial(utils.thisOrThat)
        .set(
            findElement
                (selectorString)
                (parent)
        )
        .curry(
            partial(dom.createAndAppend)
                .set([
                    attributes,
                    tag,
                    parent
                ])
                .curry
        )

const assignElement = dataKey => element => data =>
    using(data)
        .do(
            assignPropertyPartial
                .set([
                    dataKey,
                    element
                ])
                .curry
        )
        .value()


const selector = string => `:scope > ${string}`

const containerSelector = index => selector(`.graph-second:nth-child(${index + 1})`)

const containerProperties = fpsMemoryContainer => current => [
    containerSelector(current.index),
    { class: `graph-second` },
    `div`,
    fpsMemoryContainer
]

const svgProperties = current => [
    selector(`svg`),
    {
        xmlns: `http://www.w3.org/2000/svg`,
        preserveAspectRatio: `none`,
        viewBox: `0 0 1000 100`,
        width: `100%`,
        height: `100%`
    },
    `svg`,
    current.container
]

const startEndDataString = x1 => x2 => value =>
    ` ${x1},${value} ${Math.min(x2, 1000)},${value}`

const appendLine = line => string => dom.appendAttribute(line)(`points`)(string)

const lineAttributes = key => ({
    rel: `${key}-line`,
    stroke: `#${
        key === `fps` ?
            `085e8a` :
            key === `memoryUsed` ?
                `883042` :
                `ff9d00`
        }`,
    points: ``,
    fill: `none`,
    'stroke-width': `1`
})

const aggregateLineData = current => {
    const lines = extractAndConverMemory(current)

    lines.fps = current.fps

    const lineData = Object.keys(lines)
        .map(key => {
            const data = {
                key,
                value: lines[key],
                points: startEndDataString
                    (current.x1)
                    (current.x2)
                    (lines[key]),
                element: findOrMakeElement
                    (selector(`[rel="${key}-line"]`))
                    (lineAttributes(key))
                    (`polyline`)
                    (current.svg)
            }

            appendLine(data.element)(data.points)

            return data
        })

    return assignPropertyPartial.set([`lines`, lineData]).curry(current)
}

const updateTimeLine = scale => timelineElement => current => {

    if (!current.hasPoints) {
        const marker = dom.createAndAppend
            ({ class: `timeline-marker`, style: `transform: scaleX(${scale})`, rel: current.index }, `div`, timelineElement)

        marker.textContent = current.index
    }

    return current
}

const findContainerAtIndex = container => index => findElement
    (containerSelector(index))
    (container)

const getX1 = current =>
    current.hasPoints ?
        Math.max(0, current.start - (current.index * 1000))
        : 0

const processStats = getState => getElements => data => {
    const state = getState()
    const elements = getElements()

    return using(data)
        .do(current => {
            state.count = current.end
            return current
        })

        .do(current =>
            assignPropertyPartial
                .set([`index`, Math.floor(current.start / 1000)])
                .curry(current)
        )

        .do(current =>
            assignPropertyPartial
                .set([
                    `hasPoints`,
                    !!findContainerAtIndex
                        (elements.fpsMemoryContainer)
                        (current.index)
                ])
                .curry(current)
        )

        .do(current => assignPropertyPartial
            .set([`x1`, getX1(current)])
            .curry(current)
        )

        .do(current => assignPropertyPartial
            .set([`x2`, current.x1 + (current.end - current.start)])
            .curry(current)
        )

        .do(current =>
            assignElement
                (`container`)
                (partial(findOrMakeElement)
                    .set(containerProperties
                        (elements.fpsMemoryContainer)
                        (current)
                    )
                    .curry()
                )
                (current)
        )

        .do(current =>
            assignElement
                (`svg`)
                (partial(findOrMakeElement)
                    .set(svgProperties(current))
                    .curry()
                )
                (current)
        )

        .do(aggregateLineData)

        .do(updateTimeLine
            (state.timelineScale)
            (elements.timeline)
        )

        .doIf(
            current => {
                const start = (current.index + 1) * 1000

                processStats
                    (getState)
                    (getElements)
                    ({
                        start,
                        end: current.end,
                        fps: current.fps,
                        memoryTotal: current.memoryTotal,
                        memoryUsed: current.memoryUsed
                    })

                return current
            },
            current => current.x2 > 999
        )

}

export default processStats







// import partial from "../../global/partial"
// import using from "../../global/using"
// import utils from "../../global/utils"
// import dom from "../../global/dom"

// const memoryKeys = data => Object.keys(data)
//     .filter(key => key.indexOf(`memory`) > -1)


// const byteToMegabyteObject = data => key => ({
//     [key]: Math.round(utils.conversion.b2Mb(data[key]))
// })

// const extractAndConverMemory = data => using(memoryKeys(data))
//     .map(byteToMegabyteObject(data))
//     .flattenObjectArray()
//     .value()

// const assignPropertyPartial = partial(key => value => data =>
//     using(data)
//         .do(current => Object.assign(
//             current,
//             { [key]: value }
//         ))
//         .value()
// )

// const findElement = selectorString => parent => dom.findElement(parent)(selectorString)

// const findOrMakeElement = selectorString => attributes => tag => parent =>
//     partial(utils.thisOrThat)
//         .set(
//             findElement
//                 (selectorString)
//                 (parent)
//         )
//         .curry(
//             partial(dom.createAndAppend)
//                 .set([
//                     attributes,
//                     tag,
//                     parent
//                 ])
//                 .curry
//         )

// const assignElement = dataKey => element => data =>
//     using(data)
//         .do(
//             assignPropertyPartial
//                 .set([
//                     dataKey,
//                     element
//                 ])
//                 .curry
//         )
//         .value()


// const selector = string => `:scope > ${string}`

// const containerSelector = index => selector(`.graph-second:nth-child(${index + 1})`)

// const containerProperties = fpsMemoryContainer => current => [
//     containerSelector(current.index),
//     { class: `graph-second` },
//     `div`,
//     fpsMemoryContainer
// ]

// const svgProperties = current => [
//     selector(`svg`),
//     {
//         xmlns: `http://www.w3.org/2000/svg`,
//         preserveAspectRatio: `none`,
//         viewBox: `0 0 1000 100`,
//         width: `100%`,
//         height: `100%`
//     },
//     `svg`,
//     current.container
// ]

// const startEndDataString = x1 => x2 => value =>
//     ` ${x1},${value} ${Math.min(x2, 1000)},${value}`

// const appendLine = line => string => dom.appendAttribute(line)(`points`)(string)

// const lineAttributes = key => ({
//     rel: `${key}-line`,
//     stroke: `#${
//         key === `fps` ?
//             `085e8a` :
//             key === `memoryUsed` ?
//                 `883042` :
//                 `ff9d00`
//         }`,
//     points: ``,
//     fill: `none`,
//     'stroke-width': `1`
// })

// const aggregateLineData = current => {
//     const lines = extractAndConverMemory(current)

//     lines.fps = current.fps

//     const lineData = Object.keys(lines)
//         .map(key => {
//             const data = {
//                 key,
//                 value: lines[key],
//                 points: startEndDataString
//                     (current.x1)
//                     (current.x2)
//                     (lines[key]),
//                 element: findOrMakeElement
//                     (selector(`[rel="${key}-line"]`))
//                     (lineAttributes(key))
//                     (`polyline`)
//                     (current.svg)
//             }

//             appendLine(data.element)(data.points)

//             return data
//         })

//     return assignPropertyPartial.set([`lines`, lineData]).curry(current)
// }

// const updateTimeLine = scale => timelineElement => current => {

//     if (!current.hasPoints) {
//         const marker = dom.createAndAppend
//             // ({ class: `timeline-marker`, style: `transform: scaleX(${scale})`, rel: current.index })
//             ({ class: `timeline-marker`, style: `transform: scaleX(${scale()})`, rel: current.index })
//             (`div`)
//             (timelineElement)

//         marker.textContent = current.index
//     }

//     return current
// }

// const findContainerAtIndex = container => index => findElement
//     (containerSelector(index))
//     (container)

// const getX1 = current =>
//     current.hasPoints ?
//         Math.max(0, current.start - (current.index * 1000))
//         : 0

// const processStats = config => data => {
//     // const state = getState()
//     // const elements = getElements()

//     return using(data)
//         .do(current => {
//             config.setCount(current.end)
//             return current
//         })

//         .do(current =>
//             assignPropertyPartial
//                 .set([`index`, Math.floor(current.start / 1000)])
//                 .curry(current)
//         )

//         .do(current =>
//             assignPropertyPartial
//                 .set([
//                     `hasPoints`,
//                     !!findContainerAtIndex
//                         (config.elements.fpsMemoryContainer)
//                         (current.index)
//                 ])
//                 .curry(current)
//         )

//         .do(current => assignPropertyPartial
//             .set([`x1`, getX1(current)])
//             .curry(current)
//         )

//         .do(current => assignPropertyPartial
//             .set([`x2`, current.x1 + (current.end - current.start)])
//             .curry(current)
//         )

//         .do(current =>
//             assignElement
//                 (`container`)
//                 (partial(findOrMakeElement)
//                     .set(containerProperties
//                         (config.elements.fpsMemoryContainer)
//                         (current)
//                     )
//                     .curry()
//                 )
//                 (current)
//         )

//         .do(current =>
//             assignElement
//                 (`svg`)
//                 (partial(findOrMakeElement)
//                     .set(svgProperties(current))
//                     .curry()
//                 )
//                 (current)
//         )

//         .do(aggregateLineData)

//         .do(updateTimeLine
//             (config.timelineMarkerScale)
//             (config.elements.timeline)
//         )

//         .doIf(
//             current => {
//                 const start = (current.index + 1) * 1000

//                 processStats
//                     (config)
//                     ({
//                         start,
//                         end: current.end,
//                         fps: current.fps,
//                         memoryTotal: current.memoryTotal,
//                         memoryUsed: current.memoryUsed
//                     })

//                 return current
//             },
//             current => current.x2 > 999
//         )

// }

// export default processStats
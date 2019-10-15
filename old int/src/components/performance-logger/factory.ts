import Stats from "../../global/stats"
import processStats from "./process-stats"
import movement from "../../global/movement"
import State from "./state"
import get from "../../global/get"
import generateHtml from "./generate-html"
import dom from "../../global/dom"

/**
 * TODO
 * 
 * set timer for when to stop with countdown
 * tooltips over point
 * logs
 * 
 * average fps/memory
 * toggle open/close
 * resizable height
 * invert graph(low to high)
 * start/stop
 * 
 * optimization
 * turn state into a state monad or have methods return new state/non-immutable
 * methods to seperate file
 */

const MakePerformanceLogger = config => {
    const container = get(config,`container`)

    if (!container) {
        throw new Error(`No container element for MakePerformanceLogger`)
    }

    const state = new State(container, 0.1, 0, 0)
    const elements = generateHtml(container)

    const updateGraphLeft = () => dom.setStyle
        (elements.graphInner)
        (`left`)
        (`${-(state.graphLeft)}px`)

    const updateRangeWidth = () => dom.setStyle
        (elements.rangeWindow)
        (`width`)
        (`${state.rangeWidth}px`)

    const updateRangeLeft = () => dom.setStyle
        (elements.rangeWindow)
        (`left`)
        (`${state.rangeLeft}px`)

    const resolutionUpdate = () => {
        dom.setStyle
            (elements.graphInner)
            (`transform`)
            (`scaleX(${state.resolution})`)

        Array.from(
            dom.findElements(container, `.timeline-marker`)
        )
            .forEach(el =>
                dom.setStyle
                    (el)
                    (`transform`)
                    (`scaleX(${state.timelineScale})`)
            )
    }


    movement.dragX$(elements.rangeWindow)
        .subscribe(state.shiftRangeLeft)
    // .subscribe(state.shiftRangeLeft)

    movement.dragX$(elements.rangeLeftHandle, true, true)
        .subscribe(state.scaleLeft)

    // movement.dragX$(elements.rangeRightHandle, true, true)
    //     .subscribe(shift => {
    //         const resolution = (
    //             state.rangeWidth
    //             / (state.rangeWidth + shift)
    //         ) / state.resolution


    //         state.resolution = resolution

    //     })


    state.values.x.subscribe(() => {
        updateRangeLeft()
        updateGraphLeft()
    })

    state.values.count.subscribe(() => {
        updateRangeLeft()
        updateRangeWidth()
    })

    state.values.resolution.subscribe(resolutionUpdate)

    resolutionUpdate()

    // movement.over$(elements.fpsMemoryContainer)
    //     .subscribe(e => {
    //         const data = config.findDataAtPoint(config.viewableToCount(e.elementX))

    //         if (data !== undefined) {
    //             config.elements.tooltip.innerHTML = `
    //             <div>
    //                 <p>FPS: ${data.fps}</p>
    //                 <p>Memory used: ${data.memoryUsed}</p>
    //                 <p>Memory total: ${data.memoryTotal}</p>
    //             </div>`
    //             config.elements.tooltip.open()
    //         }

    //     })

    const statSubscription = Stats()
        .subscribe(
            processStats
                (() => state)
                (() => elements)
        )

    if (config.timeout) {
        setTimeout(statSubscription, config.timeout)
    }

    return Object.freeze({
        statSubscription
    })
}

export default MakePerformanceLogger

// import Stats from "../../global/stats"
// import dom from "../../global/dom"
// import generateHtml from "./generate-html"
// import processStats from "./process-stats"
// import movement from "../../global/movement"

// /**
//  * TODO
//  * 
//  * set timer for when to stop with countdown
//  * tooltips over point
//  * logs
//  * 
//  * average fps/memory
//  * toggle open/close
//  * resizable height
//  * invert graph(low to high)
//  * start/stop
//  * 
//  * optimization
//  * turn state into a state monad or have methods return new state/non-immutable
//  * methods to seperate file
//  */

// const MakePerformanceLogger = config => {
//     const state = {
//         resolution: 0.1,
//         x: 0,
//         count: 0
//     }

//     config.elements = generateHtml(config.element)
//     config.getX = () => state.x
//     config.getCount = () => state.count
//     config.getResolution = () => state.resolution

//     config.getScale = () => config.element.offsetWidth / (config.getCount() * config.getResolution())
//     config.timelineMarkerScale = () => 1 / config.getResolution()

//     config.countToViewable = number => number * config.getResolution()
//     config.countToRange = number => config.countToViewable(number) * config.getScale()

//     config.viewableToCount = number => number / config.getResolution()
//     config.rangeToCount = number => config.viewableToCount(number) / config.getScale()

//     config.rangeXShiftToCount = number => config.getX() + config.rangeToCount(number)

//     config.getViewableLeft = () => config.countToViewable(config.getX())
//     config.getViewableWidth = () => config.element.offsetWidth

//     config.getRangeLeft = () => config.countToRange(config.getX())
//     config.getRangeWidth = () => config.getViewableWidth() * config.getScale()

//     config.getMaxLeft = () => Math.max(
//         0,
//         config.viewableToCount(
//             (config.getCount() * config.getResolution()) - config.getViewableWidth()
//         )
//     )

//     config.getMaxResolution = () => config.canFillViewport() ?
//         config.getViewableWidth() / config.getCount() :
//         0.000001

//     config.canFillViewport = () => (config.getCount() * config.getResolution()) > config.getViewableWidth()

//     config.setRangeLeft = () => dom.setStyle
//         (config.elements.rangeWindow)
//         (`left`)
//         (`${config.getRangeLeft()}px`)

//     config.setRangeWidth = () => dom.setStyle
//         (config.elements.rangeWindow)
//         (`width`)
//         (`${config.getRangeWidth()}px`)

//     config.setViewableLeft = () => dom.setStyle
//         (config.elements.graphInner)
//         (`left`)
//         (`${-(config.getViewableLeft())}px`)

//     config.setResolution = (resolution) => {

//         if (resolution > 1) {
//             return
//         }

//         state.resolution = Math.max(resolution, config.getMaxResolution())

//         dom.setStyle
//             (config.elements.graphInner)
//             (`transform`)
//             (`scaleX(${config.getResolution()})`)

//         Array.from(
//             dom.findElements
//                 (config.element)
//                 (`.timeline-marker`)
//         )
//             .forEach(el =>
//                 dom.setStyle
//                     (el)
//                     (`transform`)
//                     (`scaleX(${config.timelineMarkerScale()})`)
//             )
//     }

//     config.setCount = (count) => {
//         state.count = count
//         config.setRangeWidth()
//         config.setRangeLeft()
//     }

//     config.setX = (x) => {
//         state.x = Math.min(config.getMaxLeft(), Math.max(0, x))
//         config.setRangeLeft()
//         config.setViewableLeft()
//     }

//     config.setX2 = (x2) => {
//         const x = x2 - config.rangeToCount(config.getRangeWidth())
//         state.x = Math.min(config.getMaxLeft(), Math.max(0, x))
//         config.setRangeLeft()
//         config.setViewableLeft()
//     }

//     config.findDataAtPoint = x => {
//         const index = Math.floor(x / 1000)
//         const pointToFind = Math.round(((x / 1000) - index) * 1000)
//         let data
//         let count = 0
//         let pointIndex = 0
//         let points = []

//         const svg = dom.findElement
//             (config.elements.fpsMemoryContainer)
//             (`.graph-second:nth-child(${index + 1}) svg`)


//         const fpsPoints =
//             dom.getAttribute
//                 (dom.findElement
//                     (svg)
//                     (`[rel="fps-line"]`)
//                 )
//                 (`points`)

//         const usedMemoryPoints =
//             dom.getAttribute
//                 (dom.findElement
//                     (svg)
//                     (`[rel="memoryUsed-line"]`)
//                 )
//                 (`points`)

//         const totalMemoryPoints =
//             dom.getAttribute
//                 (dom.findElement
//                     (svg)
//                     (`[rel="memoryTotal-line"]`)
//                 )
//                 (`points`)


//         points = fpsPoints ? fpsPoints.split(` `) : []

//         while (data === undefined && pointIndex < points.length) {
//             const split = points[pointIndex].split(`,`)
//             const xPoint = parseInt(split[0])
//             if (xPoint + count >= pointToFind) {
//                 data = {
//                     fps: parseInt(split[1]),
//                     memoryUsed: parseInt(usedMemoryPoints.split(` `)[pointIndex].split(`,`)[1]),
//                     memoryTotal: parseInt(totalMemoryPoints.split(` `)[pointIndex].split(`,`)[1])
//                 }
//                 break
//             }

//             pointIndex = pointIndex + 1
//         }

//         return data
//     }

//     config.setResolution(config.getResolution())

//     movement.dragX$(config.elements.rangeWindow)
//         .subscribe(shift =>
//             config.setX(
//                 config.rangeXShiftToCount(shift)
//             )
//         )

//     movement.dragX$(config.elements.rangeLeftHandle, true, true)
//         .subscribe(shift => {
//             const rangeLeft = config.getRangeLeft()
//             const rangeWidth = config.getRangeWidth()
//             const rangeRight = rangeWidth + config.getRangeLeft()
//             const newRangeLeft = shift + rangeLeft
//             const newRangeWidth = rangeRight - newRangeLeft
//             const widthScale = rangeWidth / newRangeWidth
//             const countRight = config.rangeToCount(rangeRight)

//             config.setResolution(widthScale * config.getResolution())
//             config.setX2(countRight)
//         })

//     movement.dragX$(config.elements.rangeRightHandle, true, true)
//         .subscribe(shift => {
//             const rangeWidth = config.getRangeWidth()
//             const newRangeWidth = rangeWidth + shift
//             const widthScale = rangeWidth / newRangeWidth
//             const x = config.getX()

//             config.setResolution(widthScale * config.getResolution())
//             config.setX(x)
//         })

//     movement.over$(config.elements.fpsMemoryContainer)
//         .subscribe(e => {
//             const data = config.findDataAtPoint(config.viewableToCount(e.elementX))

//             if (data !== undefined) {
//                 config.elements.tooltip.innerHTML = `
//                 <div>
//                     <p>FPS: ${data.fps}</p>
//                     <p>Memory used: ${data.memoryUsed}</p>
//                     <p>Memory total: ${data.memoryTotal}</p>
//                 </div>`
//                 config.elements.tooltip.open()
//             }

//         })

//     return Object.freeze({
//         statSubscription: Stats().subscribe(processStats(config)),
//     })
// }

// export default MakePerformanceLogger
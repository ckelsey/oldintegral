import Subject from "../../global/subject"

class State {
    values
    container
    elements

    constructor(container, resolution = 0.1, x = 0, count = 0) {

        if (!container) {
            new Error(`No container element for MakePerformanceLogger State`)
        }

        this.values = {
            x: new Subject(x),
            resolution: new Subject(resolution),
            count: new Subject(count),
        }

        this.container = container

        this.shiftRangeLeft = this.shiftRangeLeft.bind(this)
        this.scaleLeft = this.scaleLeft.bind(this)
    }

    get x() {
        return this.values.x.value
    }

    set x(x) {
        // Math.min(config.getMaxLeft(), Math.max(0, x))
        const possibleX = Math.min(
            this.maxLeft,
            Math.max(
                0,
                x
            )
        )

        if (possibleX !== this.values.x.value) {
            this.values.x.next(possibleX)
        }
    }

    get resolution() {
        return this.values.resolution.value
    }

    set resolution(resolution) {
        if (resolution > 1) {
            return
        }

        this.values.resolution.next(
            Math.max(
                resolution,
                this.maxResolution
            )
        )
    }

    get count() {
        return this.values.count.value
    }

    set count(count) {
        this.values.count.next(count)
    }

    get timelineScale() {
        return 1 / this.resolution
    }

    get graphLeft() {
        return this.countToGraph(this.x)
    }

    get rangeLeft() {
        return this.countToRange(this.x)
    }

    get rangeWidth() {
        return this.width * this.scale
    }

    get maxResolution() {
        return this.canFillViewport ? this.width / this.count : 0.000001
    }

    shiftRangeLeft(shift) {
        this.shiftX(this.rangeToCount(shift))
    }

    scaleLeft(shift) {
        const rangeWidth = this.rangeWidth
        const rangeLeft = this.rangeLeft
        const right = rangeWidth + rangeLeft
        const newX = shift + rangeLeft

        this.resolution = (rangeWidth / (right - newX)) * this.resolution
        this.x = this.rangeToCount(rangeWidth + rangeLeft) - this.rangeToCount(this.rangeWidth)
    }

    shiftX(shift) {
        this.x = this.x + shift
    }

    get width() {
        return this.container.offsetWidth
    }

    get scale() {
        return this.width / (this.count * this.resolution)
    }

    get maxLeft() {
        return Math.max(
            0,
            this.graphToCount(
                (this.count * this.resolution) - this.width
            )
        )
    }

    get canFillViewport() {
        return (this.count * this.resolution) > this.width
    }

    countToGraph(number) {
        return number * this.resolution
    }

    countToRange(number) {
        return this.countToGraph(number) * this.scale
    }

    graphToCount(number) {
        return number / this.resolution
    }

    rangeToCount(number) {
        return this.graphToCount(number) / this.scale
    }
}

/*

    

    const findDataAtPoint = x => {
        const index = Math.floor(x / 1000)
        const pointToFind = Math.round(((x / 1000) - index) * 1000)
        let data
        let count = 0
        let pointIndex = 0
        let points = []

        const svg = dom.findElement
            (elements.fpsMemoryContainer)
            (`.graph-second:nth-child(${index + 1}) svg`)


        const fpsPoints =
            dom.getAttribute
                (dom.findElement
                    (svg)
                    (`[rel="fps-line"]`)
                )
                (`points`)

        const usedMemoryPoints =
            dom.getAttribute
                (dom.findElement
                    (svg)
                    (`[rel="memoryUsed-line"]`)
                )
                (`points`)

        const totalMemoryPoints =
            dom.getAttribute
                (dom.findElement
                    (svg)
                    (`[rel="memoryTotal-line"]`)
                )
                (`points`)


        points = fpsPoints ? fpsPoints.split(` `) : []

        while (data === undefined && pointIndex < points.length) {
            const split = points[pointIndex].split(`,`)
            const xPoint = parseInt(split[0])
            if (xPoint + count >= pointToFind) {
                data = {
                    fps: parseInt(split[1]),
                    memoryUsed: parseInt(usedMemoryPoints.split(` `)[pointIndex].split(`,`)[1]),
                    memoryTotal: parseInt(totalMemoryPoints.split(` `)[pointIndex].split(`,`)[1])
                }
                break
            }

            pointIndex = pointIndex + 1
        }

        return data
    }
*/

export default State
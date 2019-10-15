import dom from "../../global/dom"
import utils from "../../global/utils";

const rangeLength = svgRanges => line => (start, end) => {
    const range1 = line.range(end)
    const range2 = line.range(start)
    const svg1 = svgRanges[end]
    const svg2 = svgRanges[start]

    let a = range1
    let b = range2

    if (isNaN(range1)) {
        a = svg1
    }

    if (isNaN(range2)) {
        a = svg2
    }

    return a - b
}

const xScale = line => svgRanges => (svgRanges[2] - svgRanges[0]) / rangeLength(svgRanges)(line)(0, 2)

const yScale = line => svgRanges => (svgRanges[3] - svgRanges[1]) / rangeLength(svgRanges)(line)(1, 3)

const svgRange = svg => dom.getAttribute(svg)(`viewBox`).split(` `).map(parseFloat)

const lineData = line => {
    const element = line.element ? line.element : line
    const points = dom.getAttribute(element)(`points`)

    if (!points) {
        return []
    }

    return points.split(` `).map(points => points.split(`,`).map(parseFloat))
}

const originalLineData = svg => line => lineData(line).map(points => points.map((point, index) => Math.round(point / (index ? yScale(line)(svgRange(svg)) : xScale(line)(svgRange(svg))))))

const lineRange = svg => line => isProperRangePoints(line) ? line.rangePoints : svgRange(svg)

const formatData = svg => line => data => {
    if (!isProperData(data)) {
        return []
    }

    const viewBox = svgRange(svg)

    return data.map(points =>
        points.map((point, index) => point * (index ? yScale(line)(viewBox) : xScale(line)(viewBox)))
    )
}

const pointsToString = data => {
    if (!isProperData(data)) {
        return ``
    }

    return data.map(points => {
        if (!isProperPoint(points)) {
            return ``
        }

        return points.join(`,`)
    })
        .filter(points => points !== ``)
        .join(` `)
}

const dataToPoints = element => points => {
    dom.setAttribute
        (element)
        (`points`)
        (pointsToString(points))
}

const isProperPoint = value => Array.isArray(value) && value.length === 2
const isProperData = value => Array.isArray(value) && value.length && value.filter(isProperPoint).length
const isProperRangePoints = line => line.rangePoints && Array.isArray(line.rangePoints) && line.rangePoints.length === 4 && line.rangePoints.filter(l => !isNaN(l)).length === 4

const formatLine = (config: Config) => (svg: SVGAElement) => (line: Line) => {
    const selectedGroup = svg.querySelector(`#selected-group`)
    const triggerEvent = (event, data?) => config.triggerSubscriptions(event, data)

    if (isNaN(parseFloat(line.width as any))) {
        line.width = 1
    }

    if (!line.color) {
        line.color = `#222`
    }

    line.element = dom.createAndAppend({
        stroke: line.color,
        points: ``,
        fill: `none`,
        'stroke-width': line.width
    }, `polyline`, svg)

    line.index = dom.indexOf(svg, `polyline`, line.element)

    line.rangePoints = lineRange(svg)(line)

    const _dataToPoints = dataToPoints(line.element)

    line.push = data => {
        if (isProperPoint(data)) {
            _dataToPoints(lineData(line).concat([data]))
        }

        triggerEvent(`lineupdated`, line)

        return line
    }

    line.pop = () => {
        const points = lineData(line)

        points.pop()

        _dataToPoints(points)

        triggerEvent(`lineupdated`, line)

        return line
    }

    line.unshift = data => {
        if (isProperPoint(data)) {

            _dataToPoints([data].concat(lineData(line)))

            triggerEvent(`lineupdated`, line)
        }

        return line
    }

    line.shift = () => {
        const points = lineData(line)

        points.shift()

        _dataToPoints(points)

        triggerEvent(`lineupdated`, line)

        return line
    }

    line.concat = data => {
        if (isProperData(data)) {

            _dataToPoints(
                lineData(line)
                    .concat(
                        formatData
                            (svg)
                            (line)
                            (data)
                    )
            )

            triggerEvent(`lineupdated`, line)
        }

        return line
    }

    line.set = (data = []) => {
        if (isProperData(data)) {

            _dataToPoints(
                formatData
                    (svg)
                    (line)
                    (data)
            )

            triggerEvent(`lineupdated`, line)
        }
        return line
    }

    line.ranges = () => line.rangePoints

    line.range = index => line.rangePoints[index]

    line.setRanges = ranges => {
        const data = originalLineData(svg)(line)

        line.rangePoints = ranges

        _dataToPoints(
            formatData
                (svg)
                (line)
                (data)
        )

        triggerEvent(`lineupdated`, line)

        return line
    }

    line.setRange = (index, range) => {
        const data = originalLineData(svg)(line)

        line.rangePoints[index] = range

        _dataToPoints(
            formatData
                (svg)
                (line)
                (data)
        )

        triggerEvent(`lineupdated`, line)

        return line
    }

    line.remove = () => {
        svg.removeChild(line.element)

        triggerEvent(`lineupdated`, line)

        return line
    }

    line.highlight = () => {

        triggerEvent(`linehighlight`)

        selectedGroup.innerHTML = ``

        dom.toLastChild(svg)(selectedGroup)

        selectedGroup.appendChild(line.element.cloneNode(false))

        const polyline = selectedGroup.querySelector(`polyline`)
        const points = lineData(polyline)
        const svgViewBox = svgRange(svg)

        dataToPoints(polyline)(points.concat([
            [
                points[points.length - 1][0],
                svgViewBox[3]
            ], [
                0,
                svgViewBox[3]
            ], [
                0,
                points[0][1]
            ], [
                points[0][0],
                points[0][1]
            ]
        ]))

        setTimeout(() => {
            if (!polyline) { return }

            const rgb = utils.conversion.hexToRgb(line.color) || { r: 100, g: 100, b: 100 }

            polyline.style.fill = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`

        }, 10)

        polyline.addEventListener(`mouseleave`, () => line.unhighlight())
        polyline.addEventListener(`mouseout`, () => line.unhighlight())
    }

    line.unhighlight = () => {
        selectedGroup.innerHTML = ``
    }

    const formattedData = formatData
        (svg)
        (line)
        (line.data)

    dom.setAttribute
        (line.element)
        (`points`)
        (pointsToString(formattedData))

    line.element.addEventListener(`mouseenter`, () => {
        line.highlight()
        triggerEvent(`linemouseenter`, line)
    })

    line.element.addEventListener(`mouseleave`, () => {
        triggerEvent(`linemouseleave`)
    })

    line.element.addEventListener(`mouseover`, e => {
        const viewBox = svgRange(svg)
        const svgBox = svg.getBoundingClientRect()
        const x = ((e as any).offsetX - svgBox.left) / (svgBox.width / viewBox[2])
        const data = lineData(line)
        let indexOfData
        let points = []
        let index = data.length - 1

        while (index && indexOfData === undefined) {
            if (data[index][0] <= x) {
                indexOfData = index
            }

            index = index - 1
        }

        if (indexOfData === undefined && data[0]) {
            indexOfData = 0
        }

        points = originalLineData(svg)(line)[indexOfData].splice(0)

        triggerEvent(`linemouseover`, Object.assign(e, { points }))
    })

    line.data = []

    triggerEvent(`linecreated`, line)

    return line
}

export default formatLine
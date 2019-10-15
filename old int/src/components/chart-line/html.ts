import dom from "../../global/dom"

const html = config => {
    const width = config.x || 100
    const height = config.y || 100
    const container = config.container
    const ybars = config.ybars || 0
    const xbars = config.xbars || 0
    let yIndex = 0
    let xIndex = 0

    const graphContainer = dom
        .createAndAppend(
            { class: `graph-container` },
            `div`,
            container
        )

    const svg = dom
        .createAndAppend(
            {
                class: `graph`,
                viewBox: `0 0 ${width} ${height}`,
                preserveAspectRatio: `none`,
                // "shape-rendering": `geometricPrecision`
            },
            `svg`,
            graphContainer
        )



    while (yIndex < ybars) {
        dom.createAndAppend(
            {
                x: 0,
                y: yIndex * ybars,
                width,
                height: ybars,
                fill: yIndex % 2 === 0 ? `rgba(100,100,100,0.05)` : `none`
            },
            `rect`,
            svg
        )
        yIndex = yIndex + 1
    }

    while (xIndex < xbars) {
        dom.createAndAppend({
            x: xIndex * xbars,
            y: 0,
            width: xbars,
            height,
            fill: xIndex % 2 === 0 ? `rgba(100,100,100,0.05)` : `none`
        },
            `rect`,
            svg
        )
        xIndex = xIndex + 1
    }

    const selectedGroup = dom
        .createAndAppend(
            { id: `selected-group` },
            `g`,
            svg
        )

    return {
        container,
        graphContainer,
        svg,
        selectedGroup
    }
}

export default html
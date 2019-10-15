import dom from "../../global/dom"

const icons = {
    active: `<svg height="1792" viewBox="0 0 1792 1792" width="1792" xmlns="http://www.w3.org/2000/svg"><path d="M1280 1024h305q-5 6-10 10.5t-9 7.5l-3 4-623 600q-18 18-44 18t-44-18l-624-602q-5-2-21-20h369q22 0 39.5-13.5t22.5-34.5l70-281 190 667q6 20 23 33t39 13q21 0 38-13t23-33l146-485 56 112q18 35 57 35zm512-428q0 145-103 300h-369l-111-221q-8-17-25.5-27t-36.5-8q-45 5-56 46l-129 430-196-686q-6-20-23.5-33t-39.5-13-39 13.5-22 34.5l-116 464h-423q-103-155-103-300 0-220 127-344t351-124q62 0 126.5 21.5t120 58 95.5 68.5 76 68q36-36 76-68t95.5-68.5 120-58 126.5-21.5q224 0 351 124t127 344z" /></svg>`,
    toggle: `<svg width="580" height="376" viewBox="0 0 580 376" xmlns="http://www.w3.org/2000/svg"><path d="m570.685514,101.58534l-264.636451,264.279798q-6.776405,6.776405 -16.04938,6.776405t-16.04938,-6.776405l-264.636451,-264.279798q-6.776405,-6.776405 -6.776405,-16.227707t6.776405,-16.227707l59.204381,-58.847728q6.776405,-6.776405 16.04938,-6.776405t16.04938,6.776405l189.38269,189.38269l189.38269,-189.38269q6.776405,-6.776405 16.04938,-6.776405t16.04938,6.776405l59.204381,58.847728q6.776405,6.776405 6.776405,16.227707t-6.776405,16.227707z" /></svg>`,
}

const generateHtml = container => {
    const header = dom.createAndAppend
        ({ class: `performance-header` }, `div`, container)

    const activeButton = dom.createAndAppend
        ({ class: `icon active` }, `div`, header)

    activeButton.innerHTML = icons.active

    const toggleButton = dom.createAndAppend
        ({ class: `toggle` }, `div`, header)

    toggleButton.innerHTML = icons.toggle

    const graph = dom.createAndAppend
        ({ id: `graphs` }, `div`, container)

    const graphInner = dom.createAndAppend
        ({ id: `graphs-inner` }, `div`, graph)

    const timeline = dom.createAndAppend
        ({ id: `timeline` }, `div`, graphInner)

    const fpsMemoryContainer = dom.createAndAppend
        ({ id: `fps-memory-container` }, `div`, graphInner)

    const rangeBar = dom.createAndAppend
        ({ id: `range-bar` }, `div`, container)

    const rangeWindow = dom.createAndAppend
        ({ id: `range-window` }, `div`, rangeBar)

    const rangeLeftHandle = dom.createAndAppend
        ({ class: `range-handle range-handle-left` }, `div`, rangeWindow)

    const rangeRightHandle = dom.createAndAppend
        ({ class: `range-handle range-handle-right` }, `div`, rangeWindow)

    const tooltip = dom.createAndAppend
        ({ position: `top`, triggerOn: `none` }, `tool-tip`, container)

    return {
        header,
        activeButton,
        timeline,
        fpsMemoryContainer,
        graph,
        graphInner,
        rangeWindow,
        rangeLeftHandle,
        rangeRightHandle,
        tooltip
    }
}

export default generateHtml
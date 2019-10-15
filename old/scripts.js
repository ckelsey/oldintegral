/**
 * TODO
 * 
 * HEADER
 *      link help
 *      menu dropdown
 *          titles
 *          screeners
 *          faq?
 *      account?
 * 
 * alert message section
 * 
 * filters - make them actual filter
 * 
 * Gallery
 * gallery views
 *      small grid
 *      grid
 *      list
 * 
 * Details page
 *      title
 *      season drop down
 *      content tabs
 *          synopsis
 *          screeners
 *          images
 * 
 * Video Page
 * 
 * footer
 * 
 */


// var frameworkSelector = document.body.querySelector(`.framework-selector`)
// var frameworkSelectorLabel = frameworkSelector.querySelector(`.ck-dd-label`)
// var frameworkSelectorList = frameworkSelector.querySelector(`.ck-dd-list`)
// var frameworkSelectorListItems = frameworkSelectorList.querySelector(`li`)

const sampleTitles = JSON.parse(`{"records":[{"_id":"5c81816cfcb3e56f53b0d211","name":"4k Sample","prefix":"","suffix":"","synopsis":"<p>4k sample content for testing purposes only.&nbsp;</p>","rep_image":"26584bb6a35bf6318d7b28e92db09d21.jpg","title_category":"Demo Content","studio":null,"release_year":"","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"},{"_id":"5c8181c1fcb3e56f53b0d214","name":"5.1 Surround Sound","prefix":"","suffix":"","synopsis":"<p>5.1 Surround Sound sample content for testing purposes only.&nbsp;</p>","rep_image":"32fc667753b30b729e77547b71511711.jpg","title_category":"Demo Content","studio":null,"release_year":"","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"},{"_id":"5c7da92ffcb3e56f53b0b373","name":"Arrow","prefix":"","suffix":"","synopsis":"<p>Oliver Queen and his father are lost at sea when their luxury yacht sinks, apparently in a storm. His father dies, but Oliver survives for five years on an uncharted island and eventually returns home. But he wasn't alone on the island where he learned not only how to fight and survive but also of his father's corruption and unscrupulous business dealings.</p><p>He returns to civilization a changed man, determined to put things right. He disguises himself with the hood of one of his mysterious island mentors, arms himself with a bow and sets about hunting down the men and women who have corrupted his city.</p>","rep_image":"25469d2a505ac62c9cf6e0806098d52b.jpg","title_category":"Television","studio":"5c7da8b3cd185afa2b503f31","release_year":"","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"},{"_id":"5c7da18afcb3e56f53b0b32d","name":"Big Little Lies","prefix":"","suffix":"","synopsis":"<p>When Madeline and Celeste take new-in-town single mom Jane under their wing, none of them realize how the arrival of Jane and her inscrutable little boy will affect them all. Big Little Lies is a brilliant take on ex-husbands and second wives, schoolyard scandal, and the dangerous little lies we tell ourselves just to survive. Written by Anand Patel</p>","rep_image":"a6dd10c99c820bc1c33ea2450c060585.jpg","title_category":"Television","studio":"5c7d9671fcb3e56f53b0b2c4","release_year":"","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"},{"_id":"5c7d96166472a2f42b2c12f2","name":"Game of Thrones","prefix":"","suffix":"","synopsis":"<p>In the mythical continent of Westeros, several powerful families fight for control of the Seven Kingdoms. As conflict erupts in the kingdoms of men, an ancient enemy rises once again to threaten them all. Meanwhile, the last heirs of a recently usurped dynasty plot to take back their homeland from across the Narrow Sea. Written by Sam Gray</p>","rep_image":"310ff08d66952609dcd704faa9257d9d.jpg","title_category":"Television","studio":"5c7d9671fcb3e56f53b0b2c4","release_year":"","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"},{"_id":"5c786670cd185afa2b5015d5","name":"Heartbeat","prefix":"","suffix":"","synopsis":"<p>Alex Panttiere is a cardio-thoracic surgeon, and a very good one. She has just been appointed to a senior role at a major hospital. While this brings more responsibility, it does not dull her rebelliousness or unconventional methods. Written by grantss</p>","rep_image":"371bceade0feafa41a4fbc39ae6c48fa.jpg","title_category":"Television","studio":"5c787b68cd185afa2b5016b5","release_year":"2016","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"},{"_id":"5c7d9d68cd185afa2b503ec6","name":"The Crown","prefix":"","suffix":"","synopsis":"<p>The Crown focuses on Queen Elizabeth II as a 25-year-old newlywed faced with the daunting prospect of leading the world's most famous monarchy while forging a relationship with legendary Prime Minister, Sir Winston Churchill. The British Empire is in decline, the political world is in disarray, and a young woman takes the throne....a new era is dawning.</p><p>Peter Morgan's masterfully researched scripts reveal the Queen's private journey behind the public facade with daring frankness. Prepare to be welcomed into the coveted world of power and privilege and behind locked doors in Westminster and Buckingham Palace....the leaders of an empire await. Written by Netflix</p>","rep_image":"58bb9c9ad12e9307076fc12beebe1768.jpg","title_category":"Television","studio":"5c7d9d08cd185afa2b503ec3","release_year":"","director":"","cast":"","producer":"","mpaa_rating":"","tv_rating":"","na_release_date":null,"genres":[],"synopsis_status":"Active"}],"total":7}`)
const detailKeys = [
    `genres`,
    `cast`,
    `director`,
    `producer`,
    `release_year`,
    `mpaa_rating`,
    `tv_rating`
]
const extraData = {
    "5c7da18afcb3e56f53b0b32d": {
        seasons: [{
            name: `season 7`,
            id: `abcd`
        }]
    },
    "5c7da92ffcb3e56f53b0b373": {
        studio: `The CW`,
        seasons: [{
            name: `season 7`,
            id: `abcd`
        }, {
            name: `season 6`,
            id: `efgh`
        }],
        screeners: [{
            "5c7dac186472a2f42b2c13c0": {
                name: `Arrow - Trailer #1`,
                time: 1000 * 60 * 2
            }
        }, {
            "5c7dac186472a2f42b2c13c02": {
                name: `Arrow - Trailer #2`,
                time: 1000 * 60 * 3
            }
        }, {
            "5c7dac186472a2f42b2c13c03": {
                name: `Arrow - Trailer #3`,
                time: 1000 * 60 * 1
            }
        }, {
            "5c7dac186472a2f42b2c13c03": {
                name: `Arrow - Sneak peek`,
                time: 1000 * 30
            }
        }]
    }
}

const filterResultsCount = document.getElementById(`filter-results-count`)
const filterResultsPlural = document.getElementById(`filter-results-plural`)
const filterOptionsElement = document.getElementById(`filterOptionsContent`)
const applyFilters = document.getElementById(`applyFilters`)
const clearFilters = document.getElementById(`clearFilters`)
const filterContainer = document.getElementById(`filter-container`)
const gallery = document.getElementById(`gallery`)
const filterButton = document.body.querySelector(`[href="#filterOptions"]`)
const viewTypeButtons = Array.from(document.body.querySelectorAll(`.view-type-button`))
const messages = document.getElementById(`messages`)
const detailsTitle = document.getElementById(`details-title`)
const seasons = document.getElementById(`seasons`)
const detailTabs = document.getElementById(`detail-tabs`)
const detailSynopsis = document.getElementById(`detail-synopsis`)
const detailScreeners = document.getElementById(`detail-screeners`)

const filterOptions = [{
    name: "category",
    key: "title_category",
    selectedOptions: [],
    options: []
}, {
    name: "genres",
    selectedOptions: [],
    options: []
}, {
    name: "release date",
    key: "release_year",
    selectedOptions: [],
    options: []
}, {
    name: "studio",
    selectedOptions: [],
    options: []
}]

const states = []

window.addEventListener('popstate', () => {
    const last = states.pop()
    let stateCount = states.length

    if (stateCount) {
        if (JSON.stringify(last) === JSON.stringify(states[stateCount - 1])) {
            states.pop()
            return history.back()
        }
    }

    stateCount = states.length
})

const pushState = queryString => {
    const query = getQuery()
    let stateCount = states.length
    let q = JSON.parse(JSON.stringify(query))

    if (Object.keys(query).length === 0) {
        return
    }

    const push = () => {
        states.push(q)
        history.pushState(q, window.document.title, window.location.origin + window.location.pathname + queryString)
    }

    if (stateCount) {
        if (JSON.stringify(q) !== JSON.stringify(states[stateCount - 1])) {
            return push()
        }
    } else {
        if (!history.state || (history.state && JSON.stringify(history.state) !== JSON.stringify(q))) {
            return push()
        }
    }

    states[stateCount - 1] = query
    history.replaceState(query, window.document.title, window.location.origin + window.location.pathname + queryString)
}

const clearEmptyQuery = query => {
    if (!query) {
        return {}
    }

    for (let key in query) {
        if (query[key] === `` || query[key] === `undefined` || query[key] === `null` || query[key] === null || query[key] === undefined) {
            delete query[key]
        }
    }

    return query
}

const getQuery = () => {
    // get query string
    let searchString = window.location.search
    let results = {}

    if (!searchString) {
        return results
    }

    // Convert query string to object
    let search = searchString.substr(1).split('&')

    search.forEach((s) => {
        let key = s.split('=').shift()

        if (key) {
            let val = s.split(`${key}=`)[1]

            if (val && val !== 'undefined' && val !== '') {
                results[key] = val
            }
        }
    })

    return clearEmptyQuery(results) || {}
}

const createQueryString = data => {
    data = data || getQuery()

    let paramsString = `?`

    // Checks to make sure to only encrypt params that are defined in fullKeys, everything else leave unencrypted
    for (let p in data) {
        if (data[p]) {
            if (paramsString !== `?`) {
                paramsString = `${paramsString}&`
            }

            paramsString = `${paramsString}${p}=${data[p]}`
        }
    }

    if (paramsString === `?`) {
        return ``
    }

    return paramsString
}

const setQuery = (data, push) => {
    data = data || getQuery()

    let stateCount = states.length

    // Clear out any null | undefined | '' key/values and set
    const query = clearEmptyQuery(data)

    // Convert to string
    let queryString = createQueryString(query)

    if (push) {
        pushState(queryString)
    } else if (stateCount) {
        states[stateCount - 1] = query
        history.replaceState(query, window.document.title, window.location.origin + window.location.pathname + queryString)
    } else {
        states.push(query)
        history.replaceState(query, window.document.title, window.location.origin + window.location.pathname + queryString)
    }

    return query
}

const displayMessage = messageData => {
    messages.innerHTML = ``

    const newMessage = createElement(
        `div`,
        {
            class: `alert alert-${messageData.type}`,
            role: `alert`
        }
    )

    const messageContainer = createElement(`div`, {
        html: messageData.message
    })

    const close = createElement(
        `button`,
        {
            class: `close`,
            type: `button`,
            html: `&times;`,
            "data-dismiss": `alert`,
            "aria-label": `Close`
        }
    )

    newMessage.appendChild(messageContainer)
    newMessage.appendChild(close)
    messages.appendChild(newMessage)
}

const recordsFound = titles => {
    filterResultsCount.textContent = titles.length

    if (titles.length > 1 || !titles.length) {
        filterResultsPlural.textContent = `s`
    }
}

const filterOptionClickHandler = (key, e) => {
    const option = e.target
    const index = filterOptions[key].selectedOptions.indexOf(option.textContent)

    if (index === -1) {
        filterOptions[key].selectedOptions.push(option.textContent)
    } else {
        filterOptions[key].selectedOptions.splice(index, 1)
    }

    option.classList.toggle(`active`)
}

const createElement = (tag, attributes = {}, events = {}) => {
    const element = document.createElement(tag)

    Object.keys(attributes)
        .forEach(
            attr => {
                switch (attr) {
                    case `text`:
                        element.textContent = attributes[attr]
                        break

                    case `html`:
                        element.innerHTML = attributes[attr]
                        break

                    default:
                        element.setAttribute(attr, attributes[attr])
                        break
                }
            }
        )
    Object.keys(events).forEach(
        eventKey => element.addEventListener(
            eventKey,
            (e) => {
                const args = events[eventKey].args || []
                events[eventKey].fn.apply(null, args.concat([e]))
            }
        )
    )
    return element
}

const createFilterOption = (parent, index, option, active, clickHandler) => {
    const optionOption = createElement(
        `div`,
        { class: `filter-option-options-option${active ? ` active` : ``}`, text: option },
        { click: { fn: clickHandler, args: [index] } }
    )

    parent.appendChild(optionOption)
}

const closeFilterOptions = () => {
    Array.from(document.body.querySelectorAll(`.filter-option-toggler[aria-expanded="true"]`))
        .forEach(element => {
            element.click()
        })
}

const createFilterOptionContainer = (option, index) => {
    const key = option.key || option.name
    const optionElement = createElement(`div`, { class: "filter-option", id: `filterOption_${key}` })
    const optionToggler = createElement(
        `div`,
        {
            class: "dropdown-toggle filter-option-toggler",
            role: "button",
            href: `#filterOption_${key}_Options`,
            "data-toggle": "collapse",
            "aria-expanded": "false",
            "aria-controls": `filterOption_${key}_Options`,
            text: option.name
        }, {
            mousedown: {
                fn: closeFilterOptions
            }
        })

    const optionOptions = createElement(`div`, { class: "collapse filter-option-options", id: `filterOption_${key}_Options` })

    optionElement.appendChild(optionToggler)
    optionElement.appendChild(optionOptions)


    createFilterOption(optionOptions, index, "all", false, function (i, e) {
        filterOptions[index].selectedOptions = []
        Array.from(optionOptions.querySelectorAll(`.filter-option-options-option.active`)).forEach(element => {
            element.classList.remove(`active`)
        })
        e.target.classList.add(`active`)
    })

    sampleTitles.records.forEach(title => {
        if (!!title[key]) {
            if (Array.isArray(title[key])) {
                title[key].forEach(o => {
                    if (option.options.indexOf(o) === -1) {
                        option.options.push(o)
                        createFilterOption(optionOptions, index, o, option.selectedOptions.indexOf(title[o]) !== -1, filterOptionClickHandler)
                    }
                })
            } else if (option.options.indexOf(title[key]) === -1) {
                option.options.push(title[key])
                createFilterOption(optionOptions, index, title[key], option.selectedOptions.indexOf(title[key]) !== -1, filterOptionClickHandler)
            }
        }
    })

    if (optionOptions.children.length > 1) {
        filterOptionsElement.appendChild(optionElement)
    }
}

const renderFilterOptions = filters => {
    filterOptionsElement.innerHTML = ``

    if (!filters || !filters.length) {
        filterContainer.classList.add(`hidden`)
        return
    }

    filterContainer.classList.remove(`hidden`)
    filters.forEach(createFilterOptionContainer)
}

const filterGallery = filters => titles => titles.filter(title => {
    let index = 0
    let valid = true

    while (valid && index < filters.length) {
        if (filters[index].selectedOptions.length) {
            const key = filters[index].key || filters[index].name

            if (filters[index].selectedOptions.indexOf(title[key]) === -1) {
                valid = false
                return false
            }
        }

        index = index + 1
    }

    return title
})

const getImageUrl = img => `https://www.screenerpassport.com/assets/image/${img}`

const makeSeasonsList = title => {
    seasons.innerHTML = ``

    if (!extraData[title._id] || !extraData[title._id].seasons) {
        return
    }

    if (extraData[title._id].seasons.length === 1) {
        return seasons.appendChild(
            createElement(
                `div`,
                { text: extraData[title._id].seasons[0].name }
            )
        )
    }

    const dropdown = createElement(`div`, { class: "dropdown" })

    const toggler = createElement(`a`, {
        class: `dropdown-toggle`,
        role: `button`,
        text: extraData[title._id].seasons[0].name,
        href: `/`,
        id: `seasonsDropdown`,
        "data-display": `static`,
        "data-toggle": `dropdown`,
        "aria-haspopup": true,
        "aria-expanded": false,
    })

    const menu = createElement(`div`, {
        class: `dropdown-menu`,
        "aria-labelledby": `seasonsDropdown`
    })

    extraData[title._id].seasons.forEach(season => {
        menu.appendChild(
            createElement(`a`, {
                class: `dropdown-item`,
                href: `/`,
                text: season.name
            }, {
                    click: {
                        fn: e => {
                            e.preventDefault()
                        }
                    }
                })
        )
    })

    seasons.appendChild(dropdown)
    dropdown.appendChild(toggler)
    dropdown.appendChild(menu)
}

const makeDetailTabs = title => {
    detailTabs.innerHTML = ``

    if (!extraData[title._id]) {
        return
    }

    let synopsisTab
    const query = getQuery()
    const btnClick = e => {
        Array.from(detailTabs.querySelectorAll(`.btn-secondary`)).forEach(btn => {
            btn.classList.remove(`btn-secondary`)
            btn.classList.add(`btn-link`)
        })

        Array.from(document.body.querySelectorAll(`.details-tab-content.show`)).forEach(content => {
            content.classList.remove(`show`)
        })

        e.target.classList.add(`btn-secondary`)

        const c = document.getElementById(e.target.getAttribute(`targ`))

        if (c) {
            c.classList.add(`show`)
        }
    }

    if (extraData[title._id].screeners) {
        const tab = createElement(
            `button`,
            {
                text: `screeners`,
                class: `btn btn-${query.tab && query.tab.toLowerCase() === `screeners` ? `secondary` : `link`}`,
                href: `#detail-screeners`,
                targ: `detail-screeners`,
                id: `tab-screeners`
            },
            { click: { fn: btnClick } }
        )

        detailTabs.appendChild(tab)
    }

    if (detailTabs.children.length) {
        synopsisTab = createElement(
            `button`,
            {
                text: `synopsis`,
                class: `btn btn-${!query.tab ? `secondary` : `link`}`,
                href: `#detail-synopsis`,
                targ: `detail-synopsis`,
                id: `tab-synopsis`
            },
            { click: { fn: btnClick } }
        )

        detailTabs.insertBefore(synopsisTab, detailTabs.children[0])
    }

    detailSynopsis.appendChild(createElement(`div`, { html: title.synopsis }))

    const activeTab = document.getElementById(`tab-${query.tab}`)

    if (query.tab && activeTab) {
        return activeTab.click()
    }

    synopsisTab.click()
}

const loadTitle = id => {
    const title = sampleTitles.records.filter(t => t._id === id)[0]

    document.body.classList.add(`page-details`)

    if (!title) {
        displayMessage({ type: `danger`, message: `<span>You are not authorized to access that location</span>` })
        setQuery({})
        loadGallery()
        return
    }

    detailsTitle.innerHTML = title.name
    makeSeasonsList(title)
    makeDetailTabs(title)
}

const renderTitle = title => {
    const item = createElement(`div`, { class: `gallery-item` })
    const itemText = createElement(`div`, { class: `item-text` })
    const itemTitle = createElement(`div`, { class: `item-title`, text: title.name })
    const itemCategory = createElement(`div`, { class: `item-category`, text: title.title_category })
    const itemDescription = createElement(`div`, { class: `item-description`, html: title.synopsis })

    const itemLink = createElement(`a`, { class: `item-link` }, {
        click: {
            fn: () => {
                setQuery(Object.assign(getQuery(), { title: title._id }))
                loadTitle(title._id)
            },
            args: [title]
        }
    })

    const itemImage = createElement(
        `img`,
        { src: getImageUrl(title.rep_image) },
        {
            load: {
                fn: item => item.classList.add(`loaded`),
                args: [item]
            }
        }
    )

    itemLink.appendChild(itemImage)
    item.appendChild(itemLink)
    item.appendChild(itemText)
    itemText.appendChild(itemTitle)
    itemText.appendChild(itemCategory)
    itemText.appendChild(itemDescription)
    gallery.appendChild(item)
}

const renderGallery = filters => titles => {
    gallery.innerHTML = ``

    if (!filters.length || !filters.filter(filter => filter.selectedOptions.length).length) {
        recordsFound(titles.records)
        titles.records.forEach(renderTitle)
        return
    }

    const records = filterGallery(filters)(titles.records)

    recordsFound(records)
    records.forEach(renderTitle)
}

const loadGallery = () => {
    document.body.classList.remove(`page-details`)
    renderGallery(getFilters())(sampleTitles)
}

const getFilters = () => localStorage.getItem(`filters`) ? JSON.parse(localStorage.getItem(`filters`)) : filterOptions
const saveFilters = filters => localStorage.setItem(`filters`, JSON.stringify(filters))
const getViewType = () => localStorage.getItem(`viewType`) || `big`
const saveViewType = type => localStorage.setItem(`viewType`, type)

const setViewType = type => {
    gallery.className = `show-${type}`

    const button = document.getElementById(type)

    if (button) {
        button.classList.add(`active`)
    }

    saveViewType(type)
}


applyFilters.addEventListener(`click`, () => {
    closeFilterOptions()
    renderGallery(filterOptions)(sampleTitles)
    saveFilters(filterOptions)
})

clearFilters.addEventListener(`click`, () => {
    closeFilterOptions()
    filterOptions.forEach(filter => filter.selectedOptions = [])
    renderGallery(filterOptions)(sampleTitles)
    saveFilters(filterOptions)
})

filterButton.addEventListener(`click`, () => {
    closeFilterOptions()
})

viewTypeButtons
    .forEach(
        button => button
            .addEventListener(`click`, (e) => {
                const active = document.body.querySelector(`.view-type-button.active`)

                if (active) {
                    active.classList.remove(`active`)
                }

                button.classList.add(`active`)
                setViewType(button.id)
            }, false)
    )


const initialQuery = getQuery()

setViewType(getViewType())
renderFilterOptions(filterOptions)

if (initialQuery.title) {
    loadTitle(initialQuery.title)
} else {
    renderGallery(getFilters())(sampleTitles)
}


console.log(sampleTitles)
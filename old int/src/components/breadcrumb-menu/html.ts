import dom from "../../global/dom"
import get from "../../global/get";

class BreadcrumbMenuHtml {
    private queuedList
    private container: HTMLElement
    private breadcrumbClick: Function
    private itemClick: Function
    private itemsClick: Function
    private listElementReady = false

    constructor(properties: BreadcrumbMenuProperties) {
        this.setListElementReady = this.setListElementReady.bind(this)

        this.breadcrumbClick = properties.breadcrumbClick.bind(this)
        this.itemClick = properties.itemClick.bind(this)
        this.itemsClick = properties.itemsClick.bind(this)
        this.container = properties.container

        this.createCrumbs(properties.container)
        this.createList(properties.container, properties.search)
    }

    public setWrap(wrap) {
        const method = wrap ? `add` : `remove`
        this.container.classList[method](`wrap`)
    }

    private removeExisting(selector) {
        const existing = dom.findElement(this.container, selector)

        if (existing) {
            existing.parentNode.removeChild(existing)
        }
    }

    private get crumbs() {
        return dom.findElement(this.container, `breadcrumb-trail`)
    }

    private createCrumbs(container) {
        this.removeExisting(`breadcrumb-trail`)

        dom.createAndAppend(
            { path: [] },
            `breadcrumb-trail`,
            container,
            {
                whenclick: {
                    fn: args => args[0]()(args[1]),

                    args: [
                        () => this.breadcrumbClick
                    ]
                }
            }
        )
    }

    public updateCrumbs(path) {
        this.crumbs.path = path
    }

    private get listElement() {
        return dom.findElement(this.container, `list-element`)
    }

    private createList(container, search) {
        this.removeExisting(`list-element`)

        dom.createAndAppend({
            underline: `click`,
            ripple: `click`,
            search
        }, `list-element`, container, {
                ready: {
                    fn: (args) => {
                        args[2]()(true)

                        const listElement = args[0]()
                        const list = args[1]()

                        if (list) {
                            listElement.set(list)
                        }
                    },
                    args: [
                        () => this.listElement,
                        () => this.queuedList,
                        () => this.setListElementReady
                    ]
                },

                whenclick: {
                    fn: (args) => {
                        const detail = get(args, `2.detail`)
                        const hasItems = get(detail, `item.items`, []).length > 0
                        const itemsClick = get(args, `0`)()
                        const itemClick = get(args, `1`)()

                        if (hasItems) {
                            itemsClick(detail)
                        } else {
                            itemClick(detail)
                        }
                    },
                    args: [
                        () => this.itemsClick,
                        () => this.itemClick
                    ]
                }
            })
    }

    public updateList(list) {
        const listElement = this.listElement

        if (this.listElementReady) {
            return listElement.set(list)
        }

        this.queuedList = list
    }

    public setListElementReady(val) {
        this.listElementReady = val
    }
}

export default BreadcrumbMenuHtml
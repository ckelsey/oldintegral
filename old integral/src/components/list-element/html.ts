import get from "../../global/get"
import HTML from "../../global/html"
import Type from "../../global/type";

const searchSectionClass = `search-section`
const listSectionClass = `list-section`

class ListElementHtml {
    private container
    private underline
    private ripple
    private _search
    private _onclick

    constructor(container, onclick, underline, ripple, search) {
        this.update(container, onclick, underline, ripple, search)
    }

    public update(container, onclick, underline, ripple, search) {

        this.container = HTML(container)

        this.searchSection = HTML({ class: searchSectionClass }, `div`)
        this.listSection = HTML({ class: listSectionClass }, `div`)

        this.onclick = onclick
        this.underline = underline
        this.ripple = ripple
        this.search = search

    }

    public set listSection(el) {
        if (this.listSection !== null) { return }
        this.container.insert(el.element, 1)
    }

    public get listSection() {
        return this.container.find(`.${listSectionClass}`)
    }

    public set searchSection(el) {
        if (this.searchSection !== null) { return }
        this.container.insert(el.element, 0)
    }

    public get searchSection() {
        return this.container.find(`.${searchSectionClass}`)
    }

    public get searchInput() {
        return this.container.find(`.${searchSectionClass} input-field`)
    }

    private set search(search) {
        if (this.search !== search) {
            this._search = search

            if (!!this._search) {
                this.createSearch(this._search)
            } else {
                this.searchSection.clear()
            }
        }
    }

    private get search() {
        return this._search
    }

    private get isClickable() {
        return typeof this.onclick === `function`
    }

    private set onclick(onclick) {
        this._onclick = onclick
        this.updateItemClasses()
    }

    private get onclick() {
        return this._onclick
    }

    private getItemData(el) {
        if (typeof el.insertIn === `function`) {
            return (el as any).getAttribute(`itemData`, true)
        } else {
            return HTML(el).getAttribute(`itemData`, true)
        }
    }

    public getItems() {
        return this.listSection.children()
    }

    public updateItemClasses() {
        this.getItems().forEach(item => {
            item.element.className = this.getItemClasses(
                item.getAttribute(`className`),
                this.getItemData(item)
            )
        })
    }

    public push(item) {
        this.createItem(item, `append`)
    }

    public pop() {
        this.listSection.remove(this.container.lastChild)
    }

    public shift() {
        this.listSection.remove(this.container.firstChild)
    }

    public unshift(item) {
        this.createItem(item, `insert`, 0)
    }

    public splice(index, item) {
        this.createItem(item, `insert`, index)
    }

    public set(items) {
        this.listSection.clear()

        if (!items || !Array.isArray(items)) {
            return
        }

        items.forEach(item => {
            this.push(item)
        })
    }

    private createSearch(search) {
        if (!search) {
            return
        }

        const doSearch = (e) => {
            this.searchInput.setAttribute(`value`, e.detail.value)
            this.updateItemClasses()
        }

        HTML({
            type: `text`,
            "label-position": 'inside',
            label: `search`
        }, `input-field`)
            .appendTo(this.searchSection)
            .addEvent(`wheninput`, doSearch.bind(this))
    }

    private getItemClasses(initialClasses, itemData, notReady = false) {
        let classes = [`item`]

        if (!notReady) {
            classes.push(`ready`)
        }

        if (typeof initialClasses === `string`) {
            initialClasses.split(` `).forEach(c => {
                if (classes.indexOf(c) === -1) {
                    classes.push(c)
                }
            })
        }

        if (Array.isArray(initialClasses)) {
            initialClasses.forEach(c => {
                if (classes.indexOf(c) === -1) {
                    classes.push(c)
                }
            })
        }

        if (this.isClickable && classes.indexOf(`clickable`) === -1) {
            classes.push(`clickable`)
        }

        if (this.search) {
            let searchValue = this.searchInput.getAttribute(`value`, true)

            if (!Type.empty(searchValue)) {

                const label = itemData.label.toLowerCase().trim()
                searchValue = searchValue.toLowerCase().trim()

                if (label.indexOf(searchValue) === -1) {
                    classes.push(`hidden`)
                }
            }
        }

        return classes.join(` `)
    }

    private createItem(item: ListItem, method = `append`, index = 0) {
        if (!item._id) {
            item._id = `item_${item.label}_${performance.now()}_${Math.random() * 1000}`
        }
        const instance = HTML(
            Object.assign(
                item.attributes,
                {
                    class: this.getItemClasses(get(item, `attributes.class`), item, true),
                    itemData: item
                }
            ),
            get(item, `attributes.tag`, `div`)
        )
            .append(
                HTML({}, `div`).setHtml(get(item, `label`))
            )

        if (method === `insert`) {
            instance.insertIn(this.listSection.element, index)
        } else {
            instance.appendTo(this.listSection.element)
        }

        const clickEvent = (event) => {
            const index = this.listSection.indexOf(instance.element)

            if (this.isClickable) {
                this.onclick({
                    item,
                    event,
                    index
                })
            }
        }

        const appendEffect = (start, tag) =>
            instance.createAndAppend(
                { targets: [instance.element], start, opacity: 0.2 },
                `${tag}-element`
            )

        if (this.underline) {
            appendEffect(this.underline, `underline`)
        }

        if (this.ripple) {
            appendEffect(this.ripple, `ripple`)
        }

        instance.addEvent(`click`, clickEvent.bind(this))

        requestAnimationFrame(() => {
            instance.addClass(`ready`)
        })
    }
}

export default ListElementHtml
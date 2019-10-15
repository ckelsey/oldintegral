import ListElementHtml from "./html"

class ListFactory {
    private dom
    private _onclick

    constructor(container, items, onclick, underline, ripple, search) {
        this.update(container, items, onclick, underline, ripple, search)
    }

    public update(container, items, onclick, underline = `hover`, ripple = `hover`, search = false) {
        this._onclick = onclick

        if (!this.dom) {
            this.dom = new ListElementHtml(container, this._onclick, underline, ripple, search)
        }

        this.set(items)
    }

    private formatItem(item, index = 0) {

        if (!item.label) {
            item.label = index
        }

        if (!item.attributes) {
            item.attributes = {}
        }

        if (!item.events) {
            item.events = {}
        }

        if (item.items && Array.isArray(item.items) && !item.items.length) {
            item.items = undefined
            delete item.items
        }

        return item
    }

    private formatItems(items): ListItem[] {
        if (typeof items === `string`) {
            try {
                items = JSON.parse(items)
            } catch (error) { }
        }

        if (!Array.isArray(items)) {
            return
        }

        return items.map(this.formatItem)
    }

    public push(item) {
        if (!item) {
            return
        }
        this.dom.push(this.formatItem(item))
    }

    public pop() {
        this.dom.pop()
    }

    public shift() {
        this.dom.shift()
    }

    public unshift(item) {
        if (!item) {
            return
        }
        this.dom.unshift(this.formatItem(item))
    }

    public splice(index, item, count = 0) {
        if (!item || isNaN(index)) {
            return
        }

        this.dom.splice(index, this.formatItem(item), count)
    }

    public set(items) {
        this.dom.set(this.formatItems(items))
    }
}

export default ListFactory
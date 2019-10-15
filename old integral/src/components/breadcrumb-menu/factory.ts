import BreadcrumbMenuHtml from "./html"
import get from "../../global/get"

class BreadcrumbMenuFactory {
    private dom: BreadcrumbMenuHtml
    private _path: string[] = []
    private _listData: ListItem[] = []
    public _breadcrumbClick: Function
    public _itemClick: Function
    private menu
    private search

    constructor(properties: BreadcrumbMenuProperties) {
        this.breadcrumbClick = this.breadcrumbClick.bind(this)
        this.itemClick = this.itemClick.bind(this)
        this.itemsClick = this.itemsClick.bind(this)
        this.update(properties)
    }

    public set path(path) {
        this._path = this.formatPath(path)
        this.dom.updateCrumbs(this._path)

        this.listData = this.listFromPath(this.menu, this._path)
    }

    public get path() {
        return this._path
    }

    public set listData(list) {
        this._listData = this.formatListData(list)
        this.dom.updateList(this._listData)
    }

    public get listData() {
        return this._listData
    }

    private formatPath(path) {
        let result = path || []

        if (typeof path === `string`) {
            try {
                result = JSON.parse(path)
            } catch (error) { }
        }

        result = result.filter(item => typeof item === `string`)

        return result
    }

    private formatListData(list) {
        if (typeof list === `string`) {
            try {
                list = JSON.parse(list)
            } catch (error) { }
        }

        return list
    }

    private listFromPath(menu, paths) {
        const length = paths.length
        let index = 0

        if (menu && !menu.items) {
            menu = { items: menu }
        }

        while (menu && index < length) {
            const newList = get(menu, `items`, []).filter(item => item.label === paths[index])

            if (!newList.length) {
                break
            }

            menu = newList[0]

            index = index + 1
        }

        if (menu && !menu.items) {
            return menu
        }

        if (menu && menu.items) {
            return menu.items
        }

        return []
    }

    public breadcrumbClick(e) {
        const newPath = get(e, `detail.newPaths`)

        if (newPath) {
            this.path = newPath
            this._breadcrumbClick(this.path)
        }
    }

    public itemsClick(e) {

        const newPath = get(e, `item.label`)

        if (newPath) {
            const newPathArray = this.path.concat([newPath])
            this.path = newPathArray

            this._breadcrumbClick(this.path)
        }
    }

    public itemClick(e) {
        console.log(`itemClick`, e)
        // this._itemClick(e)
    }

    public update(properties) {

        const set = () => {
            const menu = properties.menu

            this.search = properties.search
            this.menu = menu
            this.listData = menu
            this.path = []
            this._breadcrumbClick = properties.onBreadcrumbClick
            this._itemClick = properties.onItemClick
            this.dom.setWrap(properties.wrapBreadcrumbs)
        }

        if (!this.dom) {
            this.dom = new BreadcrumbMenuHtml({
                container: properties.container,
                breadcrumbClick: this.breadcrumbClick,
                itemClick: this.itemClick,
                itemsClick: this.itemsClick,
                wrapBreadcrumbs: properties.wrapBreadcrumbs,
                path: [],
                search: this.search
            })

            return set()

        }

        set()
    }

}

export default BreadcrumbMenuFactory
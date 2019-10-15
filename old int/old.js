

 /*
    private container: HTMLElement
    // private breadcrumb: BreadcrumbTrail
    // private list: HTMLElement
    private listElement: HTMLElement
    // public search: any
    // public open
    // public navigate
    // private list
    private _items: any[]
    private _path = []
    // private _menu: {
    //     name?: string
    //     items?: any[],
    //     item?: any
    // }

    // public set wrapBreadcrumbs(wrapBreadcrumbs) {
    //     this.breadcrumb.wrap = wrapBreadcrumbs
    // }

    // public get wrapBreadcrumbs() {
    //     return !!this.breadcrumb.wrap
    // }

    public set items(items: any[]) {
        this._items = copy(items)

        this.createListElement()

        // if (!this.list) {
        //     this.list = dom.createAndAppend(
        //         { id: `menu-list` },
        //         `div`,
        //         this.container
        //     )
        // }

        // this.list.innerHTML = ``

        // if (Array.isArray(items)) {
        //     items.forEach(item => {
        //         const i = dom.createAndAppend(
        //             {
        //                 class: `menu-list-item`,
        //                 href: ``,
        //                 onclick: `return false;`
        //             },
        //             `a`,
        //             this.list
        //         )

        //         i.innerHTML = item.name
        //         i.addEventListener(`click`, () => {
        //             return this.isNavigatable(item) ?
        //                 this.navigate(item) :
        //                 this.open(item)
        //         })
        //     })
        // }
    }

    public get items() {
        return this._items
    }

    public set path(array: string[]) {
        // const length = array.length
        // let index = 0
        // let list = copy(this._menu)

        // while (list && index < length) {
        //     const newList = get(list, `items`, []).filter(item => item.name === array[index])

        //     if (!newList.length) {
        //         break
        //     }

        //     list = copy(newList[0])

        //     index = index + 1
        // }

        // const items = get(list, `items`)
        // const breadcrumb = this.breadcrumb as any

        // this._path = array
        // this.items = items
        // breadcrumb.path = array
    }

    public get path() {
        return this._path
    }

    constructor(config) {
        this.container = config.container
        // this.list = copy(config.list)
        // this.path = []

        // this.open = config.open
        // this.navigate = config.navigate

        

        // const breadcrumb = this.breadcrumb = dom.createAndAppend(
        //     {
        //         id: `menu-breadcrumb`,
        //         wrap: config.wrapBreadcrumbs
        //     },
        //     `breadcrumb-trail`,
        //     this.container
        // )

        // breadcrumb.addEventListener(`whenclick`, (e) => {
        //     const detail = (e as any).detail

        //     if (detail.index === this.path.length - 1) {
        //         return
        //     }

        //     this.path = this.path.slice(0, detail.index + 1)
        // })

        // this.search = dom.createAndAppend({}, `input-field`, this.container) as any
        // this.search.data = copy(config.menu)

        // this.search.addEventListener(`whenfilter`, (e) => {
        //     const filtered = e.detail.filtered

        //     this._menu = { items: filtered }
        //     this.path = []
        // })

        // this._menu = { items: copy(config.menu) }
        
    }

    // public isNavigatable(item) {
    //     const items = get(item, `items`)
    //     const hasItem = get(item, `item`)

    //     return items && Array.isArray(items) && !hasItem
    // }

    private createListElement() {
        if (!this.listElement) {
            this.listElement = dom.createAndAppend({
                list: []
            }, `list-element`, this.container)
        }
    }
    */


/*
public onNavigate
public onOpen
public path: string[] = []
public elements
public _menu
private _wrapBreadcrumbs

constructor(config) {
    this.onOpen = config.onOpen
    this.onNavigate = config.onNavigate

    this.elements = new BreadcrumbMenuHtml({
        open: this.open.bind(this),
        navigate: this.navigate.bind(this),
        menu: config.menu,
        container: config.container,
        wrapBreadcrumbs: config.wrapBreadcrumbs
    })

    this.menu = { items: config.menu }
}

public set wrapBreadcrumbs(wrapBreadcrumbs) {
    this._wrapBreadcrumbs = wrapBreadcrumbs
    this.elements.wrapBreadcrumbs = wrapBreadcrumbs
}

public get wrapBreadcrumbs() {
    return this._wrapBreadcrumbs
}

public set menu(menu) {
    this._menu = this.formattedMenu(menu)

    if (!menu) {
        this.navigate(undefined)
        return
    }

    this.elements.path = []
}

public get menu() {
    return this._menu
}

public navigate(item) {
    if (!item) {
        this.path = []
        return this.onNavigate(item)
    }

    if (item.name === undefined) {
        this.path = []
    } else {
        this.elements.path = this.elements.path.concat([item.name])
    }

    this.onNavigate(item)
}

public open(item) {
    this.onOpen(item)
}

public updateAttributes(menu, wrapBreadcrumbs){
    if(menu !== this.menu){
        this.menu = menu
    }

    if (wrapBreadcrumbs !== this.wrapBreadcrumbs){
        this.wrapBreadcrumbs = wrapBreadcrumbs
    }
}

public formattedMenu(menu) {
    return typeof menu === `string` ? JSON.parse(menu) : menu
}
*/
import dom from "../../global/dom";
import get from "../../global/get";

class BreadcrumbTrailHtml {
    private container: HTMLElement
    private crumbContainer: HTMLElement
    private underline
    private whenclick
    private _wrap
    private getPaths

    public set wrap(wrap) {
        this._wrap = wrap
        const method = wrap ? `add` : `remove`

        this.container.classList[method](`wrap`)
    }

    public get wrap() {
        return this._wrap
    }

    constructor(config) {
        this.container = config.container
        this.whenclick = config.whenclick
        this.wrap = config.wrap
        this.getPaths = config.getPaths

        this.crumbContainer = dom.createAndAppend({ class: 'crumb-container' }, `div`, this.container)
        this.underline = dom.createAndAppend({ start: `mouseenter`, end: `mouseleave` }, `underline-event`, this.container)
        this.underline.targets = []

        this.createPath(`home`, -1)
    }

    public createPath(path, index) {
        const el = dom.createAndAppend(
            {
                class: `${index === -1 ? `home-breadcrumb breadcrumb` : `breadcrumb`}`,
                href: `/`,
                onclick: `return false;`
            },
            `a`,
            this.crumbContainer
        )


        const span = dom.createAndAppend({}, `span`, el)
        const fontSize = parseInt(window.getComputedStyle(span).fontSize)
        const increase = 1.5
        const iconSize = `${fontSize * increase}px`

        if (path === `home` && index === -1) {
            dom.createAndAppend({ type: `home`, size: iconSize }, `icon-element`, span)
        } else {
            span.textContent = path
        }

        dom.createAndAppend({ type: `chevron_right`, size: iconSize, class: `divider` }, `icon-element`, span)

        el.addEventListener(`click`, () => {
            const i = dom.indexOf(this.crumbContainer, `.breadcrumb`, el)
            this.whenclick({
                path,
                index: i,
                newPaths: this.getPaths().slice(0, index + 1)
            })
        })

        this.underline.targets = this.underline.targets.concat([el])

        return el
    }

    private removeTargetAt(index) {
        const targets = get(this.underline, `targets`, []).slice(0)

        if (targets[index]) {
            targets.splice(index, 1)
        }

        this.underline.targets = targets
    }

    public createPaths(paths) {

        const remove = el => {
            el.classList.remove(`active`)

            setTimeout(() => {
                this.crumbContainer.removeChild(el)
            }, 500)
        }

        const create = (path, index) => {
            const el = this.createPath(path, index)

            requestAnimationFrame(() => {
                el.classList.add(`active`)
            })
        }

        const pathElements = Array.from(this.crumbContainer.querySelectorAll(`.breadcrumb.active`))
        let indexesToRemove = pathElements.length - paths.length

        while (indexesToRemove > 0) {
            const index = indexesToRemove + (paths.length - 1)

            this.removeTargetAt(index)

            remove(pathElements[index])
            indexesToRemove = indexesToRemove - 1
        }

        paths.forEach((path, index) => {
            if (pathElements[index]) {
                if (path !== pathElements[index].textContent) {
                    remove(pathElements[index])
                    create(path, index)
                }
            } else {
                create(path, index)
            }

        })

        if (paths.length) {
            this.container.classList.add(`has-breadcrumbs`)
        } else {
            this.container.classList.remove(`has-breadcrumbs`)
        }

        requestAnimationFrame(() => {
            const height = this.crumbContainer.offsetHeight
            this.container.style.maxHeight = `${paths.length ? height : `0`}px`
        })
    }
}

export default BreadcrumbTrailHtml
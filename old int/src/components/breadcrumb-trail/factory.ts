// import copy from "../../global/copy"
import BreadcrumbTrailHtml from "./html"

class BreadcrumbTrailFactory {
    private elements
    private _paths = []
    private _wrap

    public set wrap(wrap) {
        this._wrap = wrap
        this.elements.wrap = wrap
    }

    public get wrap() {
        return this._wrap
    }

    public set path(path) {
        this._paths = this.formattedPath(path)
        this.elements.createPaths(this._paths)
    }

    public get path() {
        return this._paths
    }

    constructor(config) {
        this.elements = new BreadcrumbTrailHtml(
            Object.assign(
                config,
                { getPaths: () => this.path }
            )
        )
        this.path = config.path
        this.wrap = config.wrap
    }

    public formattedPath(path) {
        // path = copy(path)

        if (Array.isArray(path)) {
            path = path.slice(0)
        }

        if (typeof path === `string`) {
            path = path.split(`.`)
        }

        if (!path) {
            path = []
        }

        return path
    }

    public updateAttributes(path, wrap) {

        if (this.formattedPath(path) !== this.path) {
            this.path = path
        }

        if (wrap !== this.wrap) {
            this.wrap = wrap
        }
    }
}

export default BreadcrumbTrailFactory
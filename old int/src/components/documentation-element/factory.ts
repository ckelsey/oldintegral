import get from "../../global/get"
import using from "../../global/using"
import DocumentationElementHtml from "./html"

class DocumentationElementFactory {

    public elements: DocumentationElementHtml
    public docs

    public get groups() {
        const groups = { files: {} }

        get(this.docs, `children`, []).forEach(element => {
            const kind = get(element, `kind`, ``).toLowerCase().split(` `).join(`_`)
            const name = get(element, `name`, ``)
            let files = get(element, `file`, ``)

            if (!Array.isArray(files)) {
                files = [files]
            }

            if (!groups[kind]) {
                groups[kind] = {}
            }

            groups[kind][name] = element

            files.forEach(file => {
                if (!groups.files[file]) {
                    groups.files[file] = []
                }

                groups.files[file].push(element)
            })
        })

        return groups
    }

    public get menu() {
        const keys = data => Object.keys(data).sort()

        const key = args => args[1]
        const data = args => args[0]
        const item = args => data(args)[key(args)]
        const hasArgs = args => Array.isArray(args) && args.length === 2

        const isUndefined = args => hasArgs(args) && item(args) === null || item(args) === undefined

        const isArray = args => hasArgs(args) && Array.isArray(item(args))
        const makeArray = args => ({ label: key(args), items: build(item(args)) })

        const isItem = args => hasArgs(args) && !isArray(args) && !isUndefined(args) && item(args).hasOwnProperty(`type`)
        const makeItem = args => ({ label: item(args).name, item: item(args) })

        const isDefault = args => hasArgs(args) && !isArray(args) && !isItem(args) && !isUndefined(args)
        const makeDefault = args => ({ label: key(args), items: build(item(args)) })

        const build = obj => {
            const result = keys(obj)

            return result
                .map(key => using([obj, key])
                    .doIf(() => { return null }, isUndefined)
                    .doIf(makeArray, isArray)
                    .doIf(makeItem, isItem)
                    .doIf(makeDefault, isDefault)
                    .value()
                )
                .filter(item => !!item)
        }

        return build(this.groups)
    }

    constructor(config) {
        this.docs = get(config, `json`)

        new DocumentationElementHtml(
            Object.assign(
                config,
                { menu: this.menu }
            )
        )
    }
}

export default DocumentationElementFactory
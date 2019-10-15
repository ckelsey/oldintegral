import HTML from "../../global/html"

class DocumentationElementHtml {
    constructor(config) {
        const titleAttr = { id: `doc-title` }
        const sectionAttr = { id: `content-section` }
        const contentAttr = { id: `content` }
        const breadcrumbAttr = {
            id: `sidebar`,
            search: true,
            menu: config.menu
        }

        HTML(titleAttr, `h2`)
            .setText(config.json.name)
            .appendTo(config.container)


        const inputAttr = {
            type: `text`,
            label: `Labels n stuff`,
            "help-message": `Software for Hotels & Hostels of all sizes`,
            "label-position": `inside`
        }

        const inputAttr2 = {
            type: `email`,
            label: `Labels top`,
            "help-message": `The ASSD Channel Manager does the job`,
            "label-position": `top`
        }

        const inputAttr3 = {
            type: `text`,
            label: `Labels left`,
            "help-message": `The Software Company ASSD`,
            "label-position": `left`
        }

        const inputAttr4 = {
            type: `email`,
            label: `Labels right`,
            "help-message": `Trademarks: Any of the trademarks?`,
            "label-position": `right`
        }

        const inputAttr5 = {
            type: `text`,
            label: `Labels bottom`,
            "help-message": `clever, round the clock!`,
            "label-position": `bottom`
        }
        HTML(sectionAttr, `section`)
            .append(HTML(breadcrumbAttr, `breadcrumb-menu`))
            .append(
                HTML(contentAttr, `div`)
                    .append(
                        HTML(inputAttr, `input-field`)
                    )
                    .append(
                        HTML(inputAttr2, `input-field`)
                    )
                    .append(
                        HTML(inputAttr3, `input-field`)
                    )
                    .append(
                        HTML(inputAttr4, `input-field`)
                    )
                    .append(
                        HTML(inputAttr5, `input-field`)
                    )
            )
            .appendTo(config.container)
    }
}

export default DocumentationElementHtml
import HTML from "./html"

class Template {
    static create(data: VirtualDom, context:any): HTMLModel {
        const attrs = !!data.vattrs ? data.vattrs : {}

        console.log(attrs)

        const el: HTMLModel = HTML(attrs, data.vtag)

        for (let p in data.vchildren) {
            if (data.vchildren[p].vtext) {
                el.setText(data.vchildren[p].vtext)
            }

            else {
                el.append(this.create(data.vchildren[p], context))
            }
        }

        return el
    }

    static render(data: VirtualDom, parent: HTMLModel, context) {
        return this.create(data, context).appendTo(parent)
    }
}

export default Template
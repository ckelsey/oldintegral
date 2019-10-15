import { IntegralElementConfig } from '../../../typings'

const noop = () => { }

const validTag = (tag: string) => {
    if (tag.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the element tag!')
    }
}

export const IntegralElement = (config: IntegralElementConfig) => (cls) => {
    validTag(config.tag)

    if (!config.template) {
        throw new Error('You need to pass a template for the element')
    }

    config.template = `${config.style}${config.template}`

    const template = document.createElement('template')

    template.innerHTML = config.template

    const connectedCallback = cls.prototype.connectedCallback || noop
    const disconnectedCallback = cls.prototype.disconnectedCallback || noop

    cls.prototype.connectedCallback = function() {
        const clone = document.importNode(template.content, true)

        if (config.shadow) {
            this.attachShadow({ mode: 'open' }).appendChild(clone)
        } else {
            this.appendChild(clone)
        }

        if (this.componentWillMount) {
            this.componentWillMount()
        }

        connectedCallback.call(this)

        if (this.componentDidMount) {
            this.componentDidMount()
        }
    }

    cls.prototype.disconnectedCallback = function() {
        if (this.componentWillUnmount) {
            this.componentWillUnmount()
        }
        disconnectedCallback.call(this)
        if (this.componentDidUnmount) {
            this.componentDidUnmount()
        }
    }

    window.customElements.define(config.tag, cls)
}

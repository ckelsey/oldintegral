// fix bottom position if too big
/**
 * Weird z-index flash, see performance-logger with tooltip dropping below bottom
  * fix tooltip placement and dimensions.
 *      How much space above
 *      x position is sometimes off
 */

import { Component, Element, Prop, Event, EventEmitter, Method } from '@stencil/core'

/** 
 * @desc renders a tooltip 
 * @yield slot
 * */

@Component({
    tag: 'tool-tip',
    styleUrl: 'tool-tip.scss',
    shadow: true
})
export class Tootltip {
    /** @desc parent element */
    parent: HTMLElement

    /** @desc container element */
    container: HTMLElement

    /** @desc content element */
    content: HTMLElement

    /** @desc content inner element */
    contentInner: HTMLElement

    /** @desc content inner inner element */
    contentInnerInner: HTMLElement

    /** @desc timer used to check dimensions */
    checkDimensionsTimer: any

    /** @desc timer used when opening the tooltip */
    openTimer: any

    /** @desc proxy reference to the trigger element */
    _triggerElement: HTMLElement

    /** @desc proxy reference to the isActive property */
    _isActive: boolean = false

    scrollPosition: number = 0

    /** @desc available position keywords */
    positions = [
        'bottom',
        'top',
        'left',
        'right'
    ]

    /** @desc component element */
    @Element() element: HTMLElement

    /**
     * @desc padding to give the tooltip
     * @example ''
     */
    @Prop() pad: number = 8

    @Prop() size: string = `inherit`
    @Prop() color: string = `#fff`
    @Prop() background: string = `#333`
    @Prop() width: string = ``
    @Prop() justify: string = `center`

    /** @desc position of the tooltip */
    @Prop() position: string = `top`

    /** @desc whether or not the tooltip is shown */
    @Prop({ mutable: true, reflectToAttr: true }) isActive: boolean = false

    /** 
     * @desc what event to trigger the tooltip on, when 'never' the tooltip relies on the isActive property to be updated 
     * @example ''
    */
    @Prop() triggerOn: string = `mouseenter`

    /** @desc element to anchor the tooltip as well as what to set the tigger events to */
    @Prop() triggerElement: HTMLElement | string = ''

    /** 
     * @desc duration to hide the tooltip after 
     * @example undefined
    */
    @Prop() offset: number = 10

    /** 
     * @example undefined
    */
    @Prop() hideAfter: number = 0

    /** 
     * @desc duration to delay showing the tooltip 
     * @example undefined
     */
    @Prop() delay: number = 0

    /** @desc whether or not to show a css box-shadow */
    @Prop() showBoxShadow: boolean = false

    /** @desc event when tooltip opens */
    @Event({ bubbles: false, composed: false}) whenOpened: EventEmitter

    /** @desc event when tooltip closes */
    @Event({ bubbles: false, composed: false}) whenClosed: EventEmitter


    /** @desc sets the dimensions of the tooltip */
    setDimensions() {
        if (!this.container) {
            return
        }

        const parentBox = this._triggerElement.getBoundingClientRect()

        this.container.style.width = `${parentBox.width}px`
        this.container.style.height = `${parentBox.height}px`
        this.container.style.top = `${parentBox.top}px`
        this.container.style.left = `${parentBox.left}px`

        if (window.innerWidth <= 768) {
            this.container.setAttribute('device', `mobile`)
        } else {
            this.container.setAttribute('device', `browser`)
        }

        this.container.style.justifyContent = this.justify
        this.contentInner.style.backgroundColor = this.background
        this.contentInner.style.color = this.color
        this.contentInner.style.fontSize = this.size
    }

    /** @desc sets the position of the tooltip */
    setPositions() {
        if (!this.container) {
            return
        }

        this.scrollPosition = this.contentInner.scrollTop

        if (this.width && this.width !== ``) {
            this.contentInner.style.width = this.width
            this.contentInnerInner.style.width = this.width
            this.content.style.width = this.width
        }

        this.container.setAttribute(`position`, this.position)

        const containerBox = this.container.getBoundingClientRect()
        const contentInnerBox = this.contentInner.getBoundingClientRect()
        let width = contentInnerBox.width
        let height = contentInnerBox.height
        let x = 0
        let y = 0

        // if (height !== this.contentInnerInner.offsetHeight) {
        //     this.contentInner.style.height = `${this.contentInnerInner.offsetHeight}px`
        //     height = this.contentInner.offsetHeight
        // }

        if (width > window.innerWidth) {
            this.contentInner.style.width = `${window.innerWidth - (this.offset * 2)}px`
            width = this.contentInner.offsetWidth
        }

        if (height > window.innerHeight) {
            this.contentInner.style.height = `${(window.innerHeight - (this.offset * 2)) * 0.8}px`
            height = this.contentInner.offsetHeight
        }

        const setY = () => {
            if (containerBox.top > window.innerHeight - containerBox.bottom) {
                return -((height / 2) + (containerBox.height / 2) + this.offset)
            } else {
                return (height / 2) + (containerBox.height / 2) + this.offset
            }
        }

        const adjustTopBottom = () => {
            const needsTopAdjustment = containerBox.top - (height / 2) < 0
            const needsBottomAdjustment = containerBox.bottom + (height / 2) > window.innerHeight
            const amountToShiftDown = ((height / 2) - containerBox.top) + this.offset
            const amountToShiftUp = window.innerHeight - ((height / 2) + containerBox.bottom + this.offset)

            if (needsTopAdjustment) {
                y = amountToShiftDown
            } else if (needsBottomAdjustment) {
                y = amountToShiftUp
            }
        }

        switch (this.position) {
            case `left`:
                if (containerBox.left - (width + this.offset) < 0) {
                    if (containerBox.right + (width + this.offset) < window.innerWidth) {
                        x = width + (this.offset * 2) + containerBox.width

                        adjustTopBottom()
                    } else {
                        y = setY()
                        x = (width + this.offset) + ((containerBox.width / 2) - (width / 2))
                    }
                } else {
                    adjustTopBottom()
                }

                break

            case `right`:
                if (containerBox.right + (width + this.offset) > window.innerWidth) {
                    if (containerBox.left - (width + this.offset) > 0) {
                        x = -(width + (this.offset * 2) + containerBox.width)

                        adjustTopBottom()
                    } else {
                        y = setY()
                        x = -((width + this.offset) + ((containerBox.width / 2) - (width / 2)))
                    }
                } else {
                    adjustTopBottom()
                }

                break

            case `top`:
                if (containerBox.top - height - this.offset + window.pageYOffset < 0) {
                    y = height + (this.offset * 2) + containerBox.height
                }

                break

            default:
                y = height + this.offset

                if (containerBox.bottom + height + this.offset > window.innerHeight) {

                    if ((containerBox.top + window.pageYOffset) - (height - (this.offset * 2)) > 0) {
                        y = -(containerBox.height + this.offset)
                    } else {
                        this.contentInner.style.height = `${(window.innerHeight - (this.offset * 2)) * 0.8}px`
                        height = this.contentInner.offsetHeight

                        if (containerBox.top > window.innerHeight - containerBox.bottom) {
                            this.contentInner.style.height = `${containerBox.top - (this.offset * 2)}px`
                            height = this.contentInner.offsetHeight

                            y = -(height + this.offset)
                        } else {
                            this.contentInner.style.height = `${(window.innerHeight - containerBox.bottom) - this.offset - 10}px`
                            height = this.contentInner.offsetHeight
                            y = height + this.offset
                        }
                    }
                }
                break
        }

        this.content.style.transform = `scale(1,1) translate(${x}px, ${y}px)`

        const box = this.content.getBoundingClientRect()

        if (box.left < 0) {
            x = -(box.left) + this.offset
            this.content.style.transform = `scale(1,1) translate(${x}px, ${y}px)`
        } else if (box.right > window.innerWidth) {
            x = window.innerWidth - box.right - this.offset
            this.content.style.transform = `scale(1,1) translate(${x}px, ${y}px)`
        }

        this.contentInner.scrollTop = this.scrollPosition
    }

    /** @desc timer function that checks the dimensions/positions of the tooltip when isActive */
    checkDimensions() {
        clearTimeout(this.checkDimensionsTimer)

        if (!this.isActive) {
            return
        }

        if (!this.container) {
            return
        }

        this.setDimensions()
        this.setPositions()

        this.checkDimensionsTimer = setTimeout(() => {
            this.checkDimensions()
        }, 16)
    }

    /** @desc opens the tooltip */
    @Method()
    open() {
        if (!this.container) {
            return
        }

        clearTimeout(this.openTimer)

        this.container.style.removeProperty(`transform-origin`)
        this.contentInner.style.width = this.contentInner.style.height = `auto`

        this.openTimer = setTimeout(() => {
            if (!this.container) {
                return
            }

            if (this.triggerOn === `never`) {
                if (!this.isActive) {
                    return
                }
            } else {
                this.isActive = true
            }

            if (this.isActive) {
                this.container.classList.add(`open`)
                this.checkDimensions()
                this.whenOpened.emit()

                if (this.hideAfter) {
                    setTimeout(() => {
                        if (!this.container) {
                            return
                        }
                        this.close()
                    }, this.hideAfter)
                }
            }
        }, this.delay || 0)
    }

    /** @desc closes the tooltip */
    @Method()
    close() {
        if (!this.container) {
            return
        }

        if (this.triggerOn === `never`) {
            if (this.isActive) {
                this.whenClosed.emit()
                return
            }
        } else {
            this.whenClosed.emit()
            this.isActive = false
        }

        clearTimeout(this.openTimer)

        try {
            if (this.container.classList.contains(`open`)) {
                this.container.classList.remove(`open`)
                this.content.removeAttribute(`style`)

                setTimeout(() => {
                    if (!this.container) {
                        return
                    }

                    this.container.style.removeProperty(`transform-origin`)
                }, 300)
            }
        } catch (error) { }
    }

    /** @desc closes the tooltip if scrolled out of view */
    handleIntersect(entries: any) {
        if (!this.container) {
            return
        }

        if (this.isActive && !entries[0].isIntersecting) {
            this.close()
        }
    }

    /** @desc triggers open */
    doOpen() {
        if (!this.container) {
            return
        }

        this.open()

        // if (this.isActive) {
        //     this.close()
        // } else {
        //     this.open()
        // }
    }

    /** @desc triggers close */
    doClose() {
        if (!this.container) {
            return
        }

        // if (!this.isActive) {
        //     this.close()
        // }

        this.close()
    }

    /** @desc handles click outside of tooltip */
    doBodyClick(e: Event) {
        if (this.triggerOn === `none`) {
            return
        }

        if (!this.container || !this._triggerElement || !this.element) {
            window.document.body.removeEventListener(`click`, this.doBodyClick)
            return
        }

        const wasOnParent = e.target === this._triggerElement || this._triggerElement.contains((e.target as Node));
        const wasOnSelf = e.target === this.container || e.target === this.element || this.container.contains((e.target as Node)) || this.element.contains((e.target as Node));

        if (this.isActive && !wasOnParent && !wasOnSelf) {
            this.close()
        }
    }

    /** @desc sets tooltip events */
    setEvents() {
        if (this.triggerOn !== `never`) {
            this._triggerElement.addEventListener(this.triggerOn || `mouseenter`, this.open)

            if (!this.triggerOn || this.triggerOn === `mouseenter`) {
                this._triggerElement.addEventListener(`mouseleave`, this.close)
            }
        }
    }

    /** @desc removes tooltip events */
    removeEvents() {
        if (this._triggerElement) {
            this._triggerElement.removeEventListener(this.triggerOn || `mouseenter`, this.open)

            if (!this.triggerOn || this.triggerOn === `mouseenter`) {
                this._triggerElement.removeEventListener(`mouseleave`, this.close)
            }
        }
    }

    /** @desc updates the tooltip */
    update() {
        this.removeEvents()

        this.parent = this.element.parentElement
        this._triggerElement = (this.triggerElement ? typeof this.triggerElement === `string` ? document.querySelector(this.triggerElement) : this.triggerElement : null) || this.parent

        this.setEvents()

        if (this.showBoxShadow) {
            this.content.classList.add(`boxShadow`)
        } else {
            this.content.classList.remove(`boxShadow`)
        }

        clearTimeout(this.checkDimensionsTimer)
        this.checkDimensions()

        if (this.isActive === this._isActive) {
            return
        }

        this._isActive = this.isActive

        if (this.isActive) {
            this.open()
        } else {
            this.close()
        }
    }

    componentWillLoad() {
        this.doBodyClick = this.doBodyClick.bind(this)
        this.close = this.close.bind(this)
        this.open = this.open.bind(this)
        this.handleIntersect = this.handleIntersect.bind(this)
        this.setPositions = this.setPositions.bind(this)
    }

    /** @desc lifecycle hook for when component is updated */
    componentDidUpdate() {
        this.update()
    }

    /** @desc lifecycle hook for when component is ready */
    componentDidLoad() {
        const observer = new IntersectionObserver(this.handleIntersect, {
            root: null,
            rootMargin: "0px",
            threshold: [0, 0.01, 0.99, 1]
        })

        observer.observe(this.contentInnerInner)

        this.update()

        window.document.body.addEventListener(`click`, this.doBodyClick)

        const mutationObserver = new MutationObserver((mutations: Array<MutationRecord>) => {
            for (let i = 0; i < mutations.length; i++) {
                if (mutations[i].type === `childList`) {
                    this.update()
                    break;
                }
            }
        })

        mutationObserver.observe(this.element, {
            attributes: true,
            childList: true,
            characterData: true
        })
    }

    componentDidUnload() {
        window.document.body.removeEventListener(`click`, this.doBodyClick)
    }

    /**
    * @desc replaces current html with the provided
    * @param html html to replace existing
    */
    @Method()
    updateInnerHTML(html: string) {
        this.container.innerHTML = html
        this.update()
    }

    /** @desc lifecycle hook for when component is rendered */
    render() {
        return (
            <div class="tooltip-container" ref={(el: HTMLElement) => this.container = el}>
                <div class="tooltip-content" ref={(el: HTMLElement) => this.content = el}>
                    <div class="tooltip-content-inner" style={{ padding: `${this.pad}px` }} ref={(el: HTMLElement) => this.contentInner = el}>
                        <div class="tooltip-content-inner-inner" ref={(el: HTMLElement) => this.contentInnerInner = el}>
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

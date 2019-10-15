/**
 * Caching on image viewer is waaay slow
 * speed up placeholder
 * transition with width/height during image load
 */

import {
    Component,
    Prop,
    Element,
    // Event, 
    // EventEmitter 
} from '@stencil/core'

const cacheAvailable = 'caches' in self;

const worker = (func: Function): Worker => {
    if (!!window && !!URL && !!Blob && !!Worker) {
        const body = func.toString().trim().match(
            /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
        )[1]

        return new Worker(URL.createObjectURL(
            new Blob([body], { type: "text/javascript" })
        ))
    }
}

/** @desc gracefully renders an image with an optional placeholder */

@Component({
    tag: 'image-viewer',
    styleUrl: 'image-viewer.scss',
    shadow: true
})
export class ImageViewer {
    @Element() root: HTMLElement

    img: HTMLImageElement

    placeholderImg: HTMLImageElement

    cacheImage: SVGImageElement
    cacheImageData: string

    image: SVGImageElement

    imageContainer: SVGElement

    placeholderElement: SVGImageElement

    svg: SVGElement

    @Prop()
    src: string = ''

    @Prop()
    width: undefined | string

    @Prop()
    height: undefined | string

    @Prop()
    fill: string = `true`

    @Prop()
    alt: string = ''

    @Prop()
    placeholder: string = 'false'

    @Prop()
    cache: string = `false`

    @Prop({ context: 'Utils' })
    Utils: any

    dimensionTimer: any

    imageIsLoaded = false

    instanceID: string

    _width: string = ``
    _height: string = ``
    defaultPlaceholder = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" style="fill:$currentColor;" class="placeholder"><g><path d="M888.8,620.5l-43.6,162.8l-1.2,0.3l-47.6,177.8l-308-82.5l-3.7,1L160.3,793l-0.6-2.1l-86.3-23.2l16.3-61l1.1,0.3l160-597.2l-1.1-0.3l16.9-62.9l566.8,151.9l0.5-1.9L990,238.6L888.2,618.3L888.8,620.5L888.8,620.5z M910.3,284.6l-597.2-160l-117.9,440l597.1,160L910.3,284.6z M375.2,413.6l39.6,67.8l102.9-96.9l52.5,91.7l138.7-122.2l34.7,283.6l-458-122.8L375.2,413.6L375.2,413.6z M404.8,346.9c-26-7-41.5-33.8-34.5-59.8c7-26,33.7-41.5,59.8-34.5c26,7,41.5,33.8,34.5,59.8C457.6,338.5,430.8,353.9,404.8,346.9z M686.9,118.3l-13.7,3.7L547.4,88.2l185.5-49.7l28.7,107.1L689,126.2L686.9,118.3L686.9,118.3z M89.7,278.3l41.2,153.6L97.1,557.6L10,232.3L197.8,182l-19.5,72.6L89.7,278.3L89.7,278.3z M203.7,955.2L170,829.3l251.7,67.5L203.7,955.2L203.7,955.2z"/></g></svg>`

    setAspect(fraction: number) {
        if (!fraction) {
            return
        }

        this.imageContainer.setAttribute(`viewBox`, `0 0 1000 ${fraction * 1000}`)
    }

    setImageDimensions(img: HTMLImageElement) {
        if (img.naturalWidth && img.naturalHeight) {
            this.setAspect(img.naturalHeight / img.naturalWidth)

            if (!this._width && !this._height) {
                this.imageContainer.setAttribute(`width`, `${img.naturalWidth}`)
                this.imageContainer.setAttribute(`height`, `${img.naturalHeight}`)
            }
        }
    }

    setDimensions() {
        cancelAnimationFrame(this.dimensionTimer)

        if (!this.img || !this.img.naturalWidth || !this.img.naturalHeight) {
            if (this.placeholder !== `false` && this.placeholderImg.naturalWidth && this.placeholderImg.naturalHeight) {
                this.setImageDimensions(this.placeholderImg)
            }

            this.dimensionTimer = requestAnimationFrame(this.setDimensions)
            return
        }

        this.setImageDimensions(this.img)
    }

    cacheLoaded() {
        URL.revokeObjectURL(this.cacheImageData)
    }

    svgImageLoaded() {
        try {
            URL.revokeObjectURL(this.img.src)
        } catch (error) { }
    }

    imageloaded() {
        this.imageIsLoaded = true
        this.image.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.img.src)
        this.imageContainer.setAttribute(`class`, `loaded`)
        this.setPreserveAspectRatio()
    }

    imageerrored() {
        this.imageIsLoaded = false
        this.loadPlaceholder(true)
    }

    getMime(url) {
        const urlData = new URL(url)
        const ext = urlData.pathname.substr(urlData.pathname.length - 4)
        let mime = `image`

        switch (ext) {
            case `jpeg`:
            case `.jpg`:
                mime = `${mime}/jpeg`
                break;

            default:
                mime = `${mime}/${ext.split(`.`).join(``)}`
                break;
        }

        return mime
    }

    loadImage() {
        this.imageIsLoaded = false
        this.setPreserveAspectRatio()
        this.imageContainer.setAttribute(`class`, ``)
        this.loadPlaceholder()
        this.setDimensions()

        let cacheLog
        const mime = this.getMime(this.src)

        const setSrc = () => {
            const log = this.Utils.Logger.start(this, `Cache not available, setting img src to ${this.src}`)

            this.img.addEventListener(`load`, () => {
                this.Utils.Logger.end(log)
            })

            this.img.src = this.src
        }

        const callLoadUrl = () => {
            if (cacheLog) {
                this.Utils.Logger.end(cacheLog)
            }

            this.loadUrl(this.src)
                .then(buffer => {

                    const bufferUrl = this.bufferToURL(buffer, mime)
                    let log = this.Utils.Logger.start(this, `Setting buffer url as src`)
                    let afterLoad = () => {
                        this.Utils.Logger.end(log)
                    }

                    afterLoad = afterLoad.bind(this)

                    this.img.addEventListener(`load`, afterLoad)

                    this.img.src = bufferUrl

                    if (cacheAvailable && (this.cache === `true` || this.cache === `low`)) {
                        return this.compressImage(bufferUrl)
                            .then(compressedBuffer => {
                                return this.saveCache(compressedBuffer, mime)
                            })
                    }
                })
                .catch(() => {
                    setSrc()
                })
        }

        if (cacheAvailable && (this.cache === `true` || this.cache === `low` || this.cache === `high`)) {

            cacheLog = this.Utils.Logger.start(this, `Loading cache image`)

            this.loadCache()
                .then(callLoadUrl)
                .catch(callLoadUrl)



        } else {
            setSrc()
        }
    }

    bufferToURL(buffer: ArrayBuffer, mime: string) {
        let log = this.Utils.Logger.start(this, `Creating buffer url`)

        const url = URL.createObjectURL(new Blob([buffer], { type: mime }))

        this.Utils.Logger.end(log)

        return url
    }

    compressImage(bufferUrl): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            let log = this.Utils.Logger.start(this, `compressImage: loading image`)

            const img = new Image()

            img.crossOrigin = `anonymous`

            img.onload = () => {
                this.Utils.Logger.end(log)

                log = this.Utils.Logger.start(this, `compressImage: drawing cache`)

                const ctx = document.createElement(`canvas`).getContext(`2d`)
                ctx.canvas.width = img.naturalWidth
                ctx.canvas.height = img.naturalHeight
                ctx.drawImage(img, 0, 0)

                this.Utils.Logger.end(log)

                log = this.Utils.Logger.start(this, `compressImage: data url`)

                const dataURL = ctx.canvas.toDataURL(`image/jpeg`, 0.5).split(',')[1]

                this.Utils.Logger.end(log)

                log = this.Utils.Logger.start(this, `compressImage: compressing`)

                const binStr = atob(dataURL)
                const len = binStr.length
                let arr = new Uint8Array(len)

                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }

                this.Utils.Logger.end(log)

                return resolve(arr.buffer)
            }

            img.onerror = () => {
                this.Utils.Logger.end(log)
                reject()
            }

            img.src = bufferUrl
        })
    }

    loadUrl(url: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const log = this.Utils.Logger.start(this, `loadUrl: loading ${url}`)
            const w = worker(function () {
                const send: any = postMessage

                self.onmessage = function (e) {
                    const req = new XMLHttpRequest()
                    req.open(`GET`, e.data.url, true)
                    req.responseType = `arraybuffer`
                    req.onerror = function () {
                        return send({ success: false })
                    }
                    req.onload = function () {
                        if (!req.response) {
                            return send({ success: false })
                        }

                        send({ success: true, response: req.response })
                    }
                    req.send()
                }
            })

            w.postMessage({ url })
            w.onmessage = (e) => {
                this.Utils.Logger.end(log)
                if (e.data && e.data.success) {
                    return resolve(e.data.response)
                }

                return reject()
            }
        })
    }

    saveCache(buffer: ArrayBuffer, mime: string) {
        const log = this.Utils.Logger.start(this, `Saving cache`)

        return new Promise((resolve, reject) => {
            if (!cacheAvailable || !this.cache) {
                this.Utils.Logger.end(log)
                return reject()
            }

            const w = worker(function () {
                const send: any = postMessage

                self.onmessage = function (e) {
                    const src = e.data.src
                    const host = e.data.host
                    const buffer = e.data.buffer
                    const mime = e.data.mime

                    caches.open(`${host}_integral-images`)
                        .then(function (cache) {
                            if (!cache) {
                                send({ success: false })
                            }

                            cache.put(src, new Response(new Blob([buffer], { type: mime })))
                                .then(() => {
                                    send({ success: true })
                                })
                                .catch(() => {
                                    send({ success: false })
                                })
                        })
                        .catch(() => {
                            send({ success: false })
                        })
                }
            })

            w.postMessage({
                src: this.src,
                host: location.host,
                buffer,
                mime
            })

            w.onmessage = (e) => {
                this.Utils.Logger.end(log)

                if (e.data && e.data.success) {
                    return resolve()
                }

                return reject()
            }
        })
    }

    loadCache() {
        const log = this.Utils.Logger.start(this, `Loading cache`)
        return new Promise((resolve, reject) => {
            if (!cacheAvailable || !this.cache || this.cache === `false`) {
                this.Utils.Logger.end(log)

                return reject()
            }

            const workerFunction = function () {
                self.onmessage = function (e) {
                    const src = e.data.src
                    const host = e.data.host

                    const resolve = (response) => {
                        const send: any = postMessage
                        send(response)
                    }

                    caches.open(`${host}_integral-images`).then(function (cache) {
                        if (!cache) {
                            resolve({ response: `no cache`, success: false })
                        }

                        cache.match(src).then(function (response) {

                            if (response && response.blob) {
                                response.blob().then(function (blob) {
                                    resolve({ response: blob, success: true })
                                }).catch(function () {
                                    resolve({ success: false })
                                })
                            } else {
                                resolve({ success: false })
                            }
                        }).catch(function () {
                            resolve({ success: false })
                        })
                    }).catch(function () {
                        resolve({ success: false })
                    })
                }
            }

            const w = worker(workerFunction)
            w.postMessage({
                src: this.src,
                host: location.host
            })

            w.onmessage = (data) => {
                if (!data.data.success || !data.data.response) {
                    return reject()
                }

                this.imageIsLoaded = true
                this.imageContainer.setAttribute(`class`, `loaded`)
                this.setPreserveAspectRatio()
                this.cacheImageData = URL.createObjectURL(data.data.response)
                this.cacheImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.cacheImageData)

                this.Utils.Logger.end(log)
                resolve()
            }
        })
    }

    loadPlaceholder(force?: boolean) {

        if (this.placeholder === `false` && !force) {
            return
        }

        setTimeout(() => {
            if (this.imageIsLoaded) {
                return
            }

            const log = this.Utils.Logger.start(this, `loading placeholder`)
            const src = this.placeholder === `true` ? `data:image/svg+xml;base64,${btoa(this.defaultPlaceholder.split(`$currentColor`).join(window.getComputedStyle(this.root).getPropertyValue(`color`)))}` : this.placeholder

            this.placeholderImg.onload = () => {
                this.Utils.Logger.end(log)

                if (this.imageIsLoaded) {
                    return
                }

                this.imageContainer.setAttribute(`class`, `has-placeholder`)

                this.placeholderElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.placeholderImg.src)
            }

            this.placeholderImg.onerror = () => {
                this.Utils.Logger.end(log)
            }

            this.placeholderImg.src = src

        }, 618)
    }

    setPreserveAspectRatio() {
        let value = `none`
        let x = `xMid`
        let y = `YMid`

        if (this.fill.toLowerCase().indexOf(`top`) > -1) {
            y = `YMin`
        }

        if (this.fill.toLowerCase().indexOf(`bottom`) > -1) {
            y = `YMax`
        }

        if (this.fill.toLowerCase().indexOf(`left`) > -1) {
            x = `xMin`
        }

        if (this.fill.toLowerCase().indexOf(`right`) > -1) {
            x = `xMax`
        }

        if (this.fill.toLowerCase().indexOf(`cover`) > -1) {
            value = `${x}${y} slice`
        }

        if (this.fill.toLowerCase().indexOf(`contain`) > -1) {
            value = `${x}${y} meet`
        }

        if (!this.imageIsLoaded) {
            value = `xMidYMid meet`
        }

        this.imageContainer.setAttribute(`preserveAspectRatio`, value)
    }

    isPercent(val: any) {
        val = val.toString().trim()
        const length = val.length
        return val && length && val[length - 1] === `%`
    }

    run() {
        const log = this.Utils.Logger.start(this, `setting initial root dimensions`)
        if (this.root.style.width) {
            this._width = this.root.style.width
        } else if (this.width) {
            this._width = this.width
        }

        if (this.root.style.height) {
            this._height = this.root.style.height
        } else if (this.height) {
            this._height = this.height
        }

        const isPercent = this.isPercent(this.width) || this.isPercent(this.height)

        this.root.style.width = this._width
        this.imageContainer.style.width = isPercent ? `${this._width}%` : this._width
        this.root.style.height = this._height
        this.imageContainer.style.height = isPercent ? `${this._height}%` : this._height

        this.Utils.Logger.end(log)

        this.loadImage()
    }

    componentWillLoad() {
        this.Utils.Logger.init(this)

        this.setDimensions = this.setDimensions.bind(this)
        this.imageloaded = this.imageloaded.bind(this)
        this.imageerrored = this.imageerrored.bind(this)
        this.cacheLoaded = this.cacheLoaded.bind(this)
        this.svgImageLoaded = this.svgImageLoaded.bind(this)

        this.img = new Image()
        this.placeholderImg = new Image()

        this.img.onload = this.imageloaded
        this.img.onerror = this.imageerrored
    }

    componentWillUpdate() { }

    componentDidUpdate() {
        this.run()
    }

    /** @desc lifecycle hook for when component is ready */
    componentDidLoad() {
        this.cacheImage.onload = this.cacheLoaded
        this.image.onload = this.svgImageLoaded
        this.run()
    }

    /** @desc lifecycle hook for when component is rendered */
    render() {
        return (
            <svg
                viewBox="0 0 3 2"
                id="image-viewer-container"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                ref={(el: SVGElement) => this.imageContainer = el}>
                <filter id="blur-effect">
                    <feGaussianBlur stdDeviation="10" />
                </filter>
                <image
                    class="placeholder"
                    ref={(el: SVGImageElement) => this.placeholderElement = el}
                    width="100%"
                    height="100%"
                />
                <image
                    class="cache"
                    ref={(el: SVGImageElement) => this.cacheImage = el}
                    width="100%"
                    height="100%"
                />
                <image
                    ref={(el: SVGImageElement) => this.image = el}
                    width="100%"
                    height="100%"
                />
            </svg>
        );
    }

}

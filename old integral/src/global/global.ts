import '@ionic/core'
import Utils from './utils'

declare var Context: any

Context.globalVar = ''
Context.Utils = Utils


// Context.Worker = (func:Function): Worker => {
//     // if (!!window && !!URL && !!Blob && !!Worker){
//         const body = func.toString().trim().match(
//             /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
//         )[1]

//         return new Worker(URL.createObjectURL(
//             new Blob([body], { type: "text/javascript" })
//         ))
//     // }else{
//         // TODO
//     // }
// }


// if ('serviceWorker' in navigator) {
//     var blob = new Blob([
//         `self.addEventListener('install', function(event){console.log('ev', event)})`
//     ], { type: 'text/javascript' })

//     var url = window.URL.createObjectURL(blob)

//     url = 'image-service.js'

//     console.log(url)
//     navigator.serviceWorker.register(url).then(reg => {
//         console.log(`reg`, reg)
//     }, err => {
//         console.log(err)
//     })
// }


// if (!(navigator.serviceWorker && window.fetch && (window as any).ReadableStream)) {
//     Context.serviceWorkerEnabled = false
//     // status('Service Worker, Fetch, or ReadableStream API is not supported in this browser.<p>This demo cannot function without them.');
// } else {
//     Context.serviceWorkerEnabled = true

//     // var blob = new Blob([
//     //     `console.log('heyooo')`
//     // ], { type: 'text/javascript' })

//     // var url = window.URL.createObjectURL(blob)

//     // var script = document.createElement('script');
//     // script.src = url;
//     // document.body.append(script);

//     // navigator.serviceWorker.register('image-service.js')
//     //     .then(reg => {
//     //         console.log(reg)
//     //         // if (reg.installing) {
//     //         //     const sw = reg.installing || reg.waiting;
//     //         //     sw.onstatechange = function () {
//     //         //         if (sw.state === 'installed') {
//     //         //             onward();
//     //         //         }
//     //         //     };
//     //         // } else if (reg.active) {
//     //         //     // something's not right or SW is bypassed.  previously-installed SW should have redirected this request to different page
//     //         //     status('<p>Service Worker is installed and not functioning as intended.<p>Please contact developer.')
//     //         // }
//     //     })
// }
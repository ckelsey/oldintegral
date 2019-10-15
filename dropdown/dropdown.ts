// import Vue from "vue"
// import { Prop } from "vue-property-decorator"
// import Component from "vue-class-component"

// import Framework from '../../services/framework'

// import template from "./dropdown.html"
// import './dropdown.scss'

// interface DropdownItem {
//     label: string
//     tag?: string
//     classes?: string[]
//     attributes?: { [key: string]: string }
//     events?: {
//         [key: string]: {
//             fn: Function
//             args: any[]
//         }
//     }
// }

// function makeid() {
//     var text = "";
//     var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//     for (var i = 0; i < 50; i++)
//         text += possible.charAt(Math.floor(Math.random() * possible.length));

//     return text;
// }

// @Component({
//     template,
//     propsData: {
//         menuClasses: [],
//         classes: [],
//         label: ``,
//         items: []
//     }
// })

// /** @desc The main component */
// export default class DropdownList extends Vue {

//     /** @desc Name of element */
//     name: string = `dropdown-list`

//     @Prop()
//     classes: string[] = this.classes

//     @Prop()
//     menuClasses: string[] = this.menuClasses

//     @Prop()
//     label: string[] = this.label

//     @Prop()
//     items: DropdownItem[] = this.items

//     id: string = ``

//     get dropdownClass() {
//         let clss = `${this.classes && this.classes.length ? `${this.classes.join(` `)} ` : ``}`
//         switch (Framework.kind) {
//             case `bootstrap`:
//                 clss = `${clss}dropdown`
//                 break
//         }

//         return clss
//     }

//     get labelClass() {
//         if (!this.items.length) {
//             return ``
//         }

//         return `dropdown-toggle`
//     }

//     get menuClass() {
//         let clss = `${this.menuClasses && this.menuClasses.length ? `${this.menuClasses.join(` `)} ` : ``}`
//         switch (Framework.kind) {
//             case `bootstrap`:
//                 clss = `${clss}dropdown-menu`
//                 break
//         }

//         return clss
//     }

//     itemClass(item: DropdownItem) {
//         let clss = `${item.classes && item.classes.length ? `${item.classes.join(` `)} ` : ``}`
//         switch (Framework.kind) {
//             case `bootstrap`:
//                 clss = `${clss}dropdown-item`
//                 break
//         }

//         return clss
//     }

//     mounted() {
//         this.id = `${new Date().getTime()}_${makeid()}`
//     }
// }
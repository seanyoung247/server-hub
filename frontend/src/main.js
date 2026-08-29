
import { Enso, html, css, lifecycle, prop, watches } from "ensojs";

import "./components/circular-progress.enso";

Enso.component('enso-app', {

    watched: {
        value: prop(0)
    },

    styles: css`
        circular-progress {
            width: 100px;
            height: 100px;
            border: 1px solid red;
        }
    `,

    template: html`
        <circular-progress :value="{{@:value}}"></circular-progress>
        <button @click="()=>@:value--"><</button>
        <button @click="()=>@:value++">></button>
    `,

});

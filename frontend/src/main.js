
import { Enso, html, css, lifecycle, prop, watches } from "ensojs";

import "./components/circular-progress.enso";

Enso.component('enso-app', {

    styles: css`
        circular-progress {
            width: 100px;
            height: 100px;

            --border: 1px solid black;
            --track-color: white;
            --progress-color: green;
        }
    `,

    template: html`
        <circular-progress #ref="progress" value="0" max="50"></circular-progress>
        <button @click="()=>this.add(-1)">&lt;</button>
        <button @click="()=>this.add(1)">&gt;</button>
    `,

    script: {
        add: function (val) { 
            this.refs.progress.value += val; 
        }
    }

});

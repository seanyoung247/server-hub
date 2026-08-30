
import { Enso, html, css, lifecycle, prop, watches } from "ensojs";

import "./components/circular-progress.enso";

import { testServer } from "./plugins/server/utils";

Enso.component('enso-app', {
    watched: {
        server: prop({}),
    },

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
        <circular-progress #ref="progress" :value="{{ @:server?.used ?? 0 }}" :max="{{ @:server.total ?? 0 }}"></circular-progress>
    `,

    script: {
        onStart: watches(function() {
            testServer().then(response => this.server = response.storage);
        }, [lifecycle.mount]),
        add: function (val) { 
            this.refs.progress.value += val; 
        }
    }

});

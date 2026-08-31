
import { Enso, html, css, lifecycle, prop, watches } from "ensojs";

import "./components/circular-progress.enso";
import "./components/time-date.enso";

import { testServer } from "./plugins/server/utils";


Enso.component('enso-app', {
    watched: {
        server: prop({}),
    },

    styles: css`
        time-date {
            --color: var(--text-color);
            --font: var(--mono-font), monospace;
            --time-font-size: 64px;

            &::part(time), &::part(date) {
                display: flex;
                justify-content: center;
            }
        }
        circular-progress {
            width: 100px;
            height: 100px;

            --track-color: var(--accent-muted);
            --progress-color: var(--accent);
            --background: var(--surface);
            --color: var(--text-color);
        }
    `,

    template: html`
        <time-date></time-date>
        <circular-progress #ref="progress" 
            :value="{{ @:server?.used ?? 0 }}" 
            :max="{{ @:server?.total ?? 0 }}"
        >
        </circular-progress>
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

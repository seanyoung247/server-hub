
import { Enso, html, css, lifecycle, prop, watches } from "ensojs";

import "./components/circular-layout.enso";
import "./components/circular-progress.enso";
import "./components/time-date.enso";

import Icons from "./assets/icons.js";


import { testServer } from "./plugins/server/utils";


Enso.component('enso-app', {
    watched: {
        server: prop({}),
    },

    styles: css`
        time-date {
            --color: var(--text-color);
            --font: var(--mono-font), monospace;
            --time-font-size: 10cqw;
            --date-font-size: 5cqw;

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
        circular-layout {
            color: white;
            --size: 500px;
            --arc-color: var(--accent-muted);
            & svg {
                width: 100%;
                height: 100%;
                fill: white;
                stroke: none;
            }
        }
    `,

    template: html`
        <circular-progress #ref="progress" 
            :value="{{ @:server?.used ?? 0 }}" 
            :max="{{ @:server?.total ?? 0 }}"
        >
        </circular-progress>
        <circular-layout>
            <div>${Icons.router}</div>
            <div>${Icons.server}</div>
            <div>${Icons.jellyfin}</div>
            <div>${Icons.audiobooks}</div>
            <div>${Icons.nextcloud}</div>
            <div>${Icons.pihole}</div>

            <time-date slot="center"></time-date>
        </circular-layout>
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


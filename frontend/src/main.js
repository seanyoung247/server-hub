
import { Enso, html, css, prop } from "ensojs";

import "./components/circular-layout.enso";
import "./components/circular-progress.enso";
import "./components/time-date.enso";

import "./plugins/server";

import Reset from "./assets/styles/reset.css?inline";

Enso.enableDiagnostics();
Enso.component('enso-app', {
    watched: {
        server: prop({}),
    },
    styles: [css(Reset), css`
        header {
            padding: 1em;
            background: var(--surface);
            margin-bottom: 1em;
        }
        time-date {
            display: flex;
            justify-content: space-between;

            --color: var(--text-color);
            --font: var(--mono-font), monospace;
            --font-size: 22px;
        }
    `],

    template: html`
        <header>
            <time-date></time-date>
        </header>
        <enso-home-server></enso-home-server>
    `,

    script: {
        add: function (val) { 
            this.refs.progress.value += val; 
        }
    }

});


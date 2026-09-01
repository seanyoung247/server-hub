
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
            --time-font-size: 8cqw;
            --date-font-size: 4cqw;

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
            --padding: 10cqw;
            --segment: calc(1turn / var(--count));
            --offset: calc(var(--segment) / 2);
            --gap: .002turn;

            background: repeating-conic-gradient(
                from calc(var(--offset) * -1),
                var(--surface) 0turn calc(var(--segment) - var(--gap)),
                var(--border) calc(var(--segment) - var(--gap)) var(--segment)
            );
            box-shadow: #00000055 0 0 15px 5px;

            & > a {
                display: flex;
                align-items: center;
                justify-content: center;

                background: var(--surface);
                
                &:hover svg {
                    fill: var(--accent);
                }
            }
            & > div {
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--surface-raised);
                background: radial-gradient(
                    circle at 50% 50%,
                    var(--surface-raised) 60%,
                    var(--surface)
                );
                padding: 2em;
                box-shadow: #00000055 0 0 15px 5px;
                border-radius: 50%;
                aspect-ratio: 1 / 1;
            }
            & svg {
                width: 80%;
                height: 80%;
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
            <a>${Icons.router}</a>
            <a>${Icons.server}</a>
            <a>${Icons.jellyfin}</a>
            <a>${Icons.audiobooks}</a>
            <a>${Icons.nextcloud}</a>
            <a>${Icons.pihole}</a>

            <div slot="center"><time-date></time-date></div>
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



import { Enso, html, css, lifecycle, prop, watches } from "ensojs";

import "./components/circular-layout.enso";
import "./components/circular-progress.enso";
import "./components/time-date.enso";

// import Icons from "./assets/icons.js";
import Icons from "./assets/icons.svg?raw";


import { testServer } from "./plugins/server/utils";


const server_links = [
    {
        url: "http://router.lan",
        icon: "#Router",
        text: "Router"
    },
    {
        url: "https://10.150.220.10:9090",
        icon: "#Server",
        text: "Server Dashboard"
    },
    {
        url: "http://dns.lan",
        icon: "#PiHole",
        text: "DNS (PiHole)"
    },
    {
        url: "http://nextcloud.lan",
        icon: "#Nextcloud",
        text: "Nextcloud"
    },
    {
        url: "http://audiobooks.lan",
        icon: "#Audiobook",
        text: "Audiobooks"
    },
    {
        url: "http://media.lan",
        icon: "#Jellyfin",
        text: "Jellyfin"
    }
]

Enso.component('enso-app', {
    watched: {
        server: prop({}),
    },
    expose: { server_links },

    styles: css`
        time-date {
            display: flex;
            justify-content: space-between;
            padding: 0 48px;

            --color: var(--text-color);
            --font: var(--mono-font), monospace;
            --font-size: 22px;
        }
        circular-progress {
            width: 100px;
            height: 100px;

            --track-color: var(--accent-muted);
            --progress-color: var(--accent);
            --background: var(--surface);
            --color: var(--text-color);
        }
        nav {
            display: flex;
            flex-direction: column;
            background: var(--surface);
            width:48px;
            gap: 1em;

            & > a.server-link {
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                width: 48px;
                height: 48px;

                color: var(--text-color);
                text-decoration: none;

                & > svg {
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    fill: currentColor;
                    transition: scale 0.5s, color 0.5s;
                }
                & > span {
                    display: flex;
                    align-items: center;
                    position: absolute;

                    left: 100%;
                    scale: 0 1;
                    padding: 0 1.5em 0 1.0em;
                    border-radius: 0 999px 999px 0;
                    border: 1px solid var(--border);
                    border-left: none;

                    height: 48px;

                    background: var(--surface);

                    transform-origin: left;
                    transition: scale 0.5s;
                }
                &:hover {
                    & > svg {
                        color: var(--accent);
                        scale: 1.5;
                    }
                    & > span {
                        scale: 1;
                    }
                }
            }
        }
    `,

    template: html`
        ${Icons}
        <time-date></time-date>
        <!-- <circular-progress #ref="progress" 
            :value="{{ @:server?.used ?? 0 }}" 
            :max="{{ @:server?.total ?? 0 }}"
        >
        </circular-progress>-->
        <nav>
            <a *for="link of server_links"
                :href="{{ link.url }}"
                class="server-link"
            >
                <svg viewBox="0 0 100 100">
                    <use :href="{{ link.icon }}"></use>
                </svg>
                <span>{{ link.text }}</span>
            </a>
        </nav>
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


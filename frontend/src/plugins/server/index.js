
import { Enso, html, css, prop, watches, lifecycle } from "ensojs";

import "../../components/refresh.enso";
import "../../components/card.enso";
import "./storage.enso";
import "./links.enso";

import { getServerStatus } from "./utils";

import CardStyles from "../../assets/styles/cards.css?inline";
import Reset from "../../assets/styles/reset.css?inline";


const server_links = [
    {
        url: "http://router.lan",
        icon: "router",
        text: "Router"
    },
    {
        url: "https://10.150.220.10:9090",
        icon: "server",
        text: "Server Dashboard"
    },
    {
        url: "http://dns.lan",
        icon: "pihole",
        text: "DNS (PiHole)"
    },
    {
        url: "http://nextcloud.lan",
        icon: "nextcloud",
        text: "Nextcloud"
    },
    {
        url: "http://audiobooks.lan",
        icon: "audiobook",
        text: "Audiobooks"
    },
    {
        url: "http://media.lan",
        icon: "jellyfin",
        text: "Jellyfin"
    }
];

export default Enso.component('enso-home-server', {
    watched: {
        server: prop(null),
        loading: prop(true)
    },
    expose: { server_links },
    styles: [css(Reset), css(CardStyles), css`
        h2 {
            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0.5em;
            border-bottom: 1px solid var(--border);

            font-size: 22px;

            & > span {
                position: relative;
                text-transform: capitalize;
                
                &.status {
                    font-size: 0.75em;
                }
                &.status::before {
                    content: '';
                    display: block;
                    position: absolute;

                    width: 0.5em;
                    aspect-ratio: 1;
                    right: calc(100% + 0.25em);
                    translate: 0 50%;

                    border: 1px solid var(--border);
                    border-radius: 50%;
                    background: radial-gradient(circle, 
                        var(--light-color) 0%, 
                        var(--dark-color) 100%
                    );
                }
                &.offline::before {
                    --light-color: #FF0000;
                    --dark-color: #660000;
                }
                &.refreshing::before {
                    --light-color: #FFFF00;
                    --dark-color: #666600;
                }
                &.online::before {
                    --light-color: #00FF00;
                    --dark-color: #006600;
                }
            }
        }
        .muted {
            font-size: 0.75em;
            color: var(--text-muted);        
        }
        #content {
            display: flex;
            flex-direction: column;
        }
        #stats {
            display: grid;
            grid-template-columns: repeat(
                auto-fit,
                minmax(200px, 1fr)
            );
            gap: 1em;
        }
        #footer {
            display: flex;
            justify-content: end;
            align-items: center;
            padding: 0.5em;
            & > refresh-button {
                --color: var(--text-color);
            }
            border-top: 1px solid var(--border);
        }
    `],
    template: html`
        <enso-card class="card">
            <h2 slot="header">
                <span>Server <span class="muted">(http://server.lan)</span></span>
                <span :class="status {{ this.status(@:loading, @:server) }}">
                    {{ this.status(@:loading, @:server) }}
                </span>
            </h2>

            <div id="content">
                <div id="stats">
                    <enso-server-storage .storage="{{ @:server?.storage }}">
                    </enso-server-storage>
                </div>
                <enso-server-links .links="{{ server_links }}">
                </enso-server-links>
            </div>

            <div id="footer" slot="footer">
                <refresh-button :active="{{ @:loading }}"
                    @refresh="this.refresh"
                ></refresh-button>
            </div>
        </enso-card>
    `,

    script: {
        refresh: function() {
            this.loading = true;
            getServerStatus().then(
                response => {
                    this.server = response;
                    this.loading = false;
                }
            );
        },

        status: function(refreshing, state) {
            if (refreshing) return "refreshing";
            if (state) return "online";
            return "offline";
        },

        onStart: watches(function() {
            this.refresh();
        }, [lifecycle.mount], false)
    }
});

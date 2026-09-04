
import { Enso, html, css, prop, watches, lifecycle } from "ensojs";
import "../../components/card.enso";
import "../../components/refresh.enso";

import { getServerStatus, formatSize } from "./utils";

import CardStyles from "../../assets/styles/cards.css?inline";
import Reset from "../../assets/styles/reset.css?inline";


export default Enso.component('enso-home-server', {
    watched: {
        server: prop(null)
    },
    expose: { formatSize },
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
        #storage {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.5em;
            padding: 1em;
        }
        circular-progress {
            width: 120px;
            height: 120px;

            --track-color: var(--accent-muted);
            --progress-color: var(--accent);
            --background: var(--surface);
            --color: var(--text-color);
        }
        .storage-data {
            & td {
                padding: 0.1em;
            }
            & th {
                text-transform: capitalize;
            }
            & > thead th {
                text-align: left;
            }
        }
        table .numbers {
            font-variant-numeric: tabular-nums;
            text-align: right;
        }
        #footer {
            display: flex;
            flex-direction: row-reverse;
            padding: 0.5em;
            & > refresh-button {
                --color: var(--text-color);
            }
        }
    `],
    template: html`
        <enso-card class="card">
            <h2 slot="header">
                <span>Server <span class="muted">(http://server.lan)</span></span>
                <span :class="status {{ @:server ? 'online' : 'offline' }}">
                    {{ @:server ? 'Online' : 'Offline' }}
                </span>
            </h2>
            <div id="storage" class="card-section">
                <circular-progress #ref="progress" 
                    :value="{{ @:server?.storage.used ?? 0 }}" 
                    :max="{{ @:server?.storage.total ?? 0 }}"
                >
                </circular-progress>
                <table class="storage-data">
                    <thead>
                        <tr>
                            <th colspan="3">
                                <h3>Storage</h3>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr *for="value in @:server?.storage">
                            <th>{{ value }}:</th>
                            <td class="numbers">
                                {{ 
                                    formatSize(@:server.storage[value], 'tb')
                                        .toFixed(2) 
                                }}
                            </td>
                            <td class="muted">TiB</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div id="footer" slot="footer">
                <refresh-button
                    @refresh="this.refresh"
                ></refresh-button>
            </div>
        </enso-card>
    `,

    script: {
        refresh: function() {
            this.server = null;
            getServerStatus().then(
                response => this.server = response
            );
        },
        onStart: watches(function() {
            this.refresh();
        }, [lifecycle.mount], false)
    }
});

/*        <nav>
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
        
        onStart: watches(function() {
            testServer().then(response => this.server = response.storage);
        }, [lifecycle.mount]),

*/


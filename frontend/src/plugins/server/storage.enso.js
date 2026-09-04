
import { Enso, html, css, prop } from "ensojs";

import { formatSize } from "./utils";


export default Enso.component('enso-server-storage', {
    settings: { useShadow: false },
    watched: {
        storage: prop(null)
    },
    expose: { format: formatSize },

    styles: css`
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
    `,

    template: html`
        <div id="storage" class="card-section">
            <circular-progress #ref="progress" 
                :value="{{ @:storage?.used ?? 0 }}" 
                :max="{{ @:storage?.total ?? 0 }}"
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
                    <tr>
                        <th>Free:</th>
                        <td class="numbers">{{ format(@:storage?.free) }}</td>
                        <td class="muted">TiB</td>
                    </tr>
                    <tr>
                        <th>Used:</th>
                        <td class="numbers">{{ format(@:storage?.used) }}</td>
                        <td class="muted">TiB</td>
                    </tr>
                    <tr>
                        <th>Total:</th>
                        <td class="numbers">{{ format(@:storage?.total) }}</td>
                        <td class="muted">TiB</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
});
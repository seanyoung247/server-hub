
import { Enso, html, prop } from "ensojs";

import "../../components/card.enso";


export default Enso.component('enso-server-card', {
    watched: {
        server: prop(null)
    },

    template: html`
        <enso-card>
            <h2>
                <span>Server</span>
                <span class="{{ @:server ? 'online' : 'offline' }}">
                    {{ @:server ? 'online' : 'offline' }}
                </span>
            </h2>
        </enso-card>
    `,
});


export { testServer } from "utils.js"

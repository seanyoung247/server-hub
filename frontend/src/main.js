
import Enso, { html, lifecycle, prop, watches } from "ensojs";
import { testServer } from "./plugins/server";


Enso.component('enso-app', {
    watched: {
        online: prop("Connecting...")
    },
    template: html`
        <h1>{{ @:online }}</h1>
    `,
    script: {
        onStart: watches(async function() {
            testServer().then(value => this.online = value);

        }, [lifecycle.mount], false)
    }
});
 
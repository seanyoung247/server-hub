
import Enso, { html, lifecycle, prop, watches } from "ensojs";


const server = "/api/health";


Enso.component('enso-app', {
    watched: {
        online: prop("Connecting...")
    },
    template: html`
        <h1>{{ @:online }}</h1>
    `,
    script: {
        onStart: watches(async function() {
            
            try {
                const response = await fetch(server, {
                    signal: AbortSignal.timeout(1000),
                });
                if (!response.ok) throw new Error();

                this.online = "Connected";
            } catch {
                this.online = "Couldn't connect";
            }

        }, [lifecycle.mount], false)
    }
});
 
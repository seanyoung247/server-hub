
import { Enso, html, css, prop, lifecycle, watches } from "ensojs";


export default Enso.component('time-date', {
    watched: {
        time: prop(()=>new Date()),
    },
    styles: css`
        :host {
            color: var(--color, black);
            --font: sans-serif;
            --font-weight: bold;
            --font-size: 22px;
        }
        #time {
            font-family: var(--time-font, var(--font));
            font-weight: var(--time-font-weight, var(--font-weight));
            font-size: var(--time-font-size, var(--font-size));
        }
        #date {
            font-family: var(--date-font, var(--font));
            font-weight: var(--date-font-weight, var(--font-weight));
            font-size: var(--date-font-size, var(--font-size));
        }

    `,
    template: html`
        <div id="time" part="time">
            {{
                @:time.toLocaleTimeString('en-GB', {
                    hour: "2-digit",
                    minute: "2-digit"
                }) 
            }}
        </div>
        <div id="date" part="date">
            {{ 
                @:time.toLocaleDateString('en-GB', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                })
            }}
        </div>
    `,
    script: {
        _timer: 0,
        onMount: watches(function() {
            const update = () => {
                this.time = new Date();
                this._timer = setTimeout(
                    update, 1000 - Date.now() % 1000
                );
            }
            update();
        }, [lifecycle.mount]),

        onUnMount: watches(function() {
            clearTimeout(this._timer);
        }, [lifecycle.unmount]),
    }
});
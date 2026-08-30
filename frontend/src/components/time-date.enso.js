
import { Enso, html, css, prop, lifecycle, watches } from "ensojs";


export default Enso.component('time-date', {
    watched: {
        time: prop(new Date()),
    },
    styles: css`
        :host {
            color: var(--color, black);
        }
        #time {
            font-family: var(--time-font, sans-serif);
            font-weight: var(--time-font-weight, bold);
            font-size: var(--time-font-size, 22px);
        }
        #date {
            font-family: var(--date-font, sans-serif);
            font-weight: var(--date-font-weight, bold);
            font-size: var(--date-font-size, 22px);
        }

    `,
    template: html`
        <div id="time" part="time">
            {{ @:time.toLocaleTimeString('en-GB') }}
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

import { Enso, html, css, attr, computed } from "ensojs";

import { clamp } from "../utils/math";

export default Enso.component('circular-progress', {

    watched: {
        max: attr(100, Number),
        value: attr(0, Number),
        percentage: computed(function () {
            if (this.max <= 0) return 0;

            const clamped = clamp(0, this.value, this.max);
            return Math.floor(clamped / this.max * 100);

        }, ['max','value'])
    },

    styles: css`
        :host {
            display: block;

            --background: white;
            --progress-color: currentColor;
            --track-color: #00000055;
            --label-size: 75%;
            --border: none;
            --start: 0deg;
        }
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--size, 100%);
            height: var(--size, 100%);
            border: var(--border);
            border-radius: 50%;
        }
        #ring {
            --progress: calc((var(--percent) / 100) * 1turn);
            background: conic-gradient(from var(--start),
                var(--progress-color) var(--progress),
                var(--track-color) var(--progress) 1.0turn
            );
        }
        #display {
            --size: var(--label-size);
            background: var(--background);
        }
    `,

    template: html`
        <div id="ring" :style="--percent:{{@:percentage}};">
            <div id="display">{{ @:percentage }}%</div>
        </div>
    `,

});

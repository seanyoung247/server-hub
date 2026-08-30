
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
            --track-color: #DDD;

            --label-size: 75%;

            --border: none;
        }
        #ring {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 100%;

            border: var(--border);
            border-radius: 50%;

            --progress: calc((var(--percent) / 100) * 1turn);
            background: conic-gradient(
                var(--progress-color) var(--progress),
                var(--track-color) var(--progress) 1.0turn
            );
        }
        #display {
            display: flex;
            justify-content: center;
            align-items: center;

            width: var(--label-size);
            height: var(--label-size);

            border: var(--border);
            border-radius: 50%;
            background: var(--background);
        }

    `,

    template: html`
        <div id="ring" :style="--percent:{{@:percentage}};">
            <div id="display">{{ @:percentage }}</div>
        </div>
    `,

});

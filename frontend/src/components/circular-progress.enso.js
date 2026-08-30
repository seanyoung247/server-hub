
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
        :host { display: block; }
        div {
            display: flex;
            align-items: center;
            justify-content: center;
            width: var(--size, 100%);
            height: var(--size, 100%);
            border: var(--border, none);
            border-radius: 50%;
        }
        #ring {
            --progress: calc((var(--percent) / 100) * 1turn);

            background: conic-gradient(from var(--start, 0deg),
                var(--progress-color, currentColor) var(--progress),
                var(--track-color, #00000055) var(--progress) 1.0turn
            );
        }
        #display {
            --size: var(--label-size, 75%);

            color: var(--color, black);
            background: var(--background, white);
        }
    `,

    template: html`
        <div id="ring" :style="--percent:{{@:percentage}};">
            <div id="display">
                <slot>{{ @:percentage }}%</slot>
            </div>
        </div>
    `,

});

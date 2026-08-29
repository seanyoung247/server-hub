
import { Enso, html, css, attr, watches, computed } from "ensojs";

import { clamp } from "../utils/math";

export default Enso.component('circular-progress', {

    watched: {
        max: attr(100, Number),
        value: attr(0, Number),
        percentage: computed(function () {
            return clamp(0, this.value, this.max);
        }, ['min','max','value'])
    },

    styles: css`
        :host { display: block; }
        #ring {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 100%;
            height: 100%;

            border-radius: 50%;

            --progress: calc();
            background: conic-gradient(
                red 0.5turn, blue 0.5turn 1.0turn
            );
        }
        #display {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 80%;
            height: 80%;

            border-radius: 50%;
            background: white;
        }

    `,

    template: html`
        <div id="ring" :style="--percent:{{@:percentage}};">
            <div id="display">{{ @:percentage }}</div>
        </div>
    `

});

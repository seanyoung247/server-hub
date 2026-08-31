
import { Enso, css, html } from "ensojs";


export default Enso.component('circular-menu', {

    styles: css`
        #menu {
            & > slot {
                display: flex;
                align-items: center;
                justify-content: center;
                --count: 4;

                &::slotted(*) {
                    position: absolute;

                    --radius: 100px;
                    --angle: calc(
                        ((1turn / var(--count)) * var(--i))
                    );
                    transform:
                        rotate(var(--angle))
                        translateY(calc(var(--radius) * -1))
                        rotate(calc(var(--angle) * -1));
                }
            }
        }
    `,

    template: html`
        <div id="menu">
            <slot #ref="items"></slot>
        </div>
    `,

});

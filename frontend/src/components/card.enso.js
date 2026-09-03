
import { Enso, html, css } from "ensojs";


export default Enso.component('enso-card', {
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
        }
        :where(header, footer):not(:has(slot:has-slotted)) {
            display: none;
        }
    `,

    template: html`
        <header>
            <slot name="header"></slot>
        </header>
        <div id="content">
            <slot></slot>
        </div>
        <footer>
            <slot name="footer"></slot>
        </footer>
    `
});

import { Enso, html, css, watches, lifecycle } from "ensojs";

import Reset from "../assets/styles/reset.css?inline";
import Icons from "../assets/icons";

Enso.component('refresh-button', {
    styles: [css(Reset), css`
        :host {
            display: inline-block;
            width: 32px;
            height: 32px;
        }
        button, svg {
            width: 100%;
            height: 100%;
            border: none;
            background: transparent;
            fill: var(--color, black);
        }
        button.refresh {
            & > svg {
                rotate: 0;
                animation: spin 0.5s linear infinite;
            }
        }
        @keyframes spin {
            from { rotate: 0; }
            to { rotate: -1turn; }
        }
    `],
    template: html`
        <button #ref="refreshButton"
            @click="this.onClick"
        >
            ${Icons.reload}
        </button>
    `,
    script: {
        onStart: watches(function() {
            const refreshBtn = this.refs.refreshButton;
            refreshBtn.addEventListener('animationiteration', ()=>{
                if (!this.hasAttribute('active'))
                    refreshBtn.classList.remove('refresh');
            });
        }, [lifecycle.mount]),

        onClick: function() {
            const refreshBtn = this.refs.refreshButton;
            refreshBtn.classList.add('refresh');
            this.dispatchEvent(new CustomEvent(
                'refresh'
            ));
        }
    }
});
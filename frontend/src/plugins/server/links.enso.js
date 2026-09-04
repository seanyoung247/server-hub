
import { Enso, html, css, prop } from "ensojs";

import Icons from "../../assets/icons.svg?raw";


export default Enso.component('enso-server-links', {
    settings: { useShadow: false },
    watched: {
        links: prop([])
    },
    
    styles: [css`
        div#server-links {
            display: flex;
            flex-direction: column;
            justify-content: stretch;
            align-items: center;
            gap: 0.5em;

            & h3 { text-align: center; }
            & nav {
                display: grid;
                width: 100%;
                grid-template-columns: repeat(
                    auto-fit,
                    minmax(80px, 1fr)
                );
                padding: 0.5em;
                gap: 0.5em;

                & > a {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    gap: 0.5em;

                    text-decoration: none;
                    color: inherit;
                    transition: color 0.1s;
                    & > svg {
                        width: 32px;
                        height: 32px;
                        fill: currentColor;

                        transition: scale 0.1s;
                    }
                    & > span {
                        text-align: center;
                    }

                    &:hover {
                        color: var(--accent);
                        & > svg {
                            scale: 1.25;
                        }
                    }
                }
            }
        }
    `],
    template: html`
        ${ Icons }
        <div id="server-links">
            <h3>Services</h3>
            <nav>
                <a *for="link of @:links"
                    :href="{{ link.url }}"
                    class="server-link"
                >
                    <svg viewBox="0 0 100 100">
                        <use :href="#{{ link.icon }}"></use>
                    </svg>
                    <span>{{ link.text }}</span>
                </a>
            </nav>
        </div>
    `
});
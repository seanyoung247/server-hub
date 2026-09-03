
import { Enso, css, html } from "ensojs";


export default Enso.component('circular-layout', {

    styles: css`
        :host {
            display: block;

            --size: 100px;
            --item-size: 64px;
            --padding: 5cqw;
            
            width: var(--size);
            height: var(--size);

            overflow: hidden;

            border-radius: 50%;
            container-type: size;
        }
        #container {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;

            width: 100%;
            height: 100%;

            & > slot#items {
                &::slotted(*) {
                    position: absolute;
                    width: var(--item-size);
                    height: var(--item-size);
        
                    --radius: calc(
                        (var(--size) - var(--item-size) - var(--padding)) / 2
                    );
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
        <div id="container" #ref="container">
            <slot id="items" #ref="items"
                @slotChange="this.updateItems"
            >
            </slot>
            <slot id="center" name="center"></slot> 
        </div>
    `,

    script: {
        updateItems: function() {
            const items = this.refs.items.assignedElements();
            this.style.setProperty("--count", items.length);

            items.forEach((item, i) => {
                item.style.setProperty("--i", i);
            });
        }
    }
});


/*
        circular-layout {
            color: white;
            --size: 500px;
            --padding: 10cqw;
            --segment: calc(1turn / var(--count));
            --offset: calc(var(--segment) / 2);
            --gap: .002turn;

            background: repeating-conic-gradient(
                from calc(var(--offset) * -1),
                var(--surface) 0turn calc(var(--segment) - var(--gap)),
                var(--border) calc(var(--segment) - var(--gap)) var(--segment)
            );
            box-shadow: #00000055 0 0 15px 5px;

            & > a {
                display: flex;
                align-items: center;
                justify-content: center;

                background: var(--surface);
                
                &:hover svg {
                    fill: var(--accent);
                }
            }
            & > div {
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--surface-raised);
                background: radial-gradient(
                    circle at 50% 50%,
                    var(--surface-raised) 60%,
                    var(--surface)
                );
                padding: 2em;
                box-shadow: #00000055 0 0 15px 5px;
                border-radius: 50%;
                aspect-ratio: 1 / 1;
            }
            & svg {
                width: 80%;
                height: 80%;
                fill: white;
                stroke: none;
            }
        }
*/

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

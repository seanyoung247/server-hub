
import {Enso, html} from "ensojs";

import audiobooks from "./audiobook.svg?raw";
import jellyfin from "./jellyfin.svg?raw";
import nextcloud from "./nextcloud.svg?raw";
import pihole from "./pi-hole.svg?raw";
import router from "./router.svg?raw";
import server from "./server.svg?raw";
import reload from "./reload.svg?raw";


const rawIcons = {
    audiobooks, jellyfin, nextcloud, pihole, router, server, reload
};
export default rawIcons;

export const Icons = {};
for (const icon in rawIcons) {
    Icons[icon] = Enso.component(`enso-icon-${icon}`, {
        settings: { useShadow: false },
        template: html`${rawIcons[icon]}`
    });
}

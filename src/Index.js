import L, { Map, TileLayer } from "./leaflet.js";
import {
    ALIDADE_SMOOTH_DARK_URL,
    ALIDADE_SMOOTH_DARK_SETTINGS,
} from "./Providers.js";
import van from "./van.js";
let { h1, main, div, button } = van.tags;

const Card = () => {
    let el = div({ class: "h-40" });
    let map = new Map(el).setView([51, 0], 1);
    const tiles = new TileLayer(
        ALIDADE_SMOOTH_DARK_URL,
        ALIDADE_SMOOTH_DARK_SETTINGS
    ).addTo(map);
    return div("Card", el);
};

export default function Index() {
    return main(
        { class: "Index" },
        h1("Title"),
        Card(),
        Card(),
        Card()
    );
}

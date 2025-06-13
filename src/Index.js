import L, { Map, TileLayer } from "./leaflet.js";
import {
    ALIDADE_SMOOTH_DARK_URL,
    ALIDADE_SMOOTH_DARK_SETTINGS,
} from "./Providers.js";
import van from "./van.js";
let { a, h1, h2, main, div, button } = van.tags;

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
    let routes = JSON.parse(
        localStorage.getItem("routes") || "[]"
    );
    let cards = routes.map((route) => {
        return a(
            { href: `/route/${route.id}` },
            div(
                h2(
                    route.departure.airportId,
                    " -> ",
                    route.arrival.airportId
                )
            )
        );
    });
    return main(
        { class: "Index" },
        h1("Title"),
        div(cards),
        button(
            {
                onclick: () => {
                    window.location.href = "/new";
                },
            },
            "+"
        )
    );
}

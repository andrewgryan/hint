import L, { Map, TileLayer } from "./leaflet.js";
import {
    ALIDADE_SMOOTH_DARK_URL,
    ALIDADE_SMOOTH_DARK_SETTINGS,
} from "./Providers.js";
import van from "./van.js";
let { a, h1, h2, header, main, div, button } =
    van.tags;

const LeafletMap = () => {
    let el = div({ class: "h-40" });
    let map = new Map(el).setView([51, 0], 1);
    const tiles = new TileLayer(
        ALIDADE_SMOOTH_DARK_URL,
        ALIDADE_SMOOTH_DARK_SETTINGS
    ).addTo(map);
    return el;
};

export default function Index() {
    let routes = JSON.parse(
        localStorage.getItem("routes") || "[]"
    );
    let cards = routes.map((route) => {
        return a(
            { href: `/route/${route.id}` },
            div(
                { class: "RouteSummary" },
                header(
                    { class: "grid col-2 gap-2" },
                    div(
                        h2(
                            route.departure.airport
                                .code
                        ),
                        div(route.departure.date),
                        div(route.departure.time)
                    ),
                    div(
                        h2(route.arrival.airport.code),
                        div(route.arrival.date),
                        div(route.arrival.time)
                    )
                ),
                div(LeafletMap())
            )
        );
    });
    return main(
        { class: "Index" },
        h1("Routes"),
        div({ class: "RouteList" }, cards),
        button(
            {
                class: "Fab",
                onclick: () => {
                    window.location.href = "/new";
                },
            },
            "+"
        )
    );
}

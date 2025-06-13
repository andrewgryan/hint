import { GreatCircle } from "./vendor/arc.js";
import L, {
    Map,
    TileLayer,
    Polyline,
} from "./leaflet.js";
import {
    ALIDADE_SMOOTH_DARK_URL,
    ALIDADE_SMOOTH_DARK_SETTINGS,
} from "./Providers.js";
import van from "./van.js";
let { button, div, h1, table, tr, th, td, main } =
    van.tags;

const Table = (values) => {
    let lats = values;
    let lons = values;
    let times = values.map(() => "00:00");
    return table(
        tr(
            th(
                {
                    align: "left",
                    colspan: 4,
                },
                "Air temperature"
            )
        ),
        tr(values.map((x) => td(x))),
        tr(
            th(
                {
                    align: "left",
                    colspan: 4,
                },
                "Latitude"
            )
        ),
        tr(lats.map((x) => td(x))),
        tr(
            th(
                {
                    align: "left",
                    colspan: 4,
                },
                "Longitude"
            )
        ),
        tr(lons.map((x) => td(x))),
        tr(
            th(
                {
                    align: "left",
                    colspan: 4,
                },
                "Time (HH:MM)"
            )
        ),
        tr(times.map((t) => td(t)))
    );
};

const MapElement = () => {
    const el = div({ class: "h-40", id: "map" });
    const map = new Map(el); // .setView([51.505, -15], 10);

    const tiles = new TileLayer(
        ALIDADE_SMOOTH_DARK_URL,
        ALIDADE_SMOOTH_DARK_SETTINGS
    ).addTo(map);

    // Route
    let start = { x: 53, y: 0 };
    let end = { x: 45, y: 45 };
    let generator = new GreatCircle(start, end);
    let line = generator.Arc(5);
    let xys = line.geometries[0].coords;
    const polyline = new Polyline(xys, {
        color: "blue",
    }).addTo(map);
    // debug(polyline.getBounds());
    setTimeout(() => {
        map.fitBounds(polyline.getBounds());
        map.invalidateSize();
    });

    return el;
};

const Fab = () => {
    return button(
        {
            class: "Fab",
            onclick: () => {
                window.location.href = "/";
            },
        },
        "<"
    );
};

const debug = (obj) => alert(JSON.stringify(obj));

export default function Route(id) {
    // Find saved Route
    let routes = JSON.parse(
        localStorage.getItem("routes") || "[]"
    );
    let matchedRoutes = routes.filter(
        (route) => route.id === parseInt(id)
    );
    if (matchedRoutes.length === 0) {
        return div(h1("404 Not found"));
    }
    let route = matchedRoutes[0];
    let values = [];
    for (let i = 0; i < 200; i++) {
        values.push(30.0 + i / 50);
    }
    return main(
        { class: "Route" },
        Fab(),
        MapElement(),
        h1(
            "Route ",
            route.departure.airportId,
            " -> ",
            route.arrival.airportId
        ),
        div(
            {
                class: "block w-full overflow-x-scroll",
            },
            Table(values)
        )
    );
}

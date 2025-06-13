import { GreatCircle } from "./vendor/arc.js";
import L, {
    Map,
    TileLayer,
    Polyline,
    LatLng,
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

const MapElement = (coords) => {
    const el = div({ class: "h-40", id: "map" });
    const map = new Map(el); // .setView([51.505, -15], 10);

    const tiles = new TileLayer(
        ALIDADE_SMOOTH_DARK_URL,
        ALIDADE_SMOOTH_DARK_SETTINGS
    ).addTo(map);

    // Route
    const polyline = new Polyline(coords, {
        color: "blue",
    }).addTo(map);
    setTimeout(() => {
        map.fitBounds(polyline.getBounds());
        map.invalidateSize();
    });

    return el;
};

/**
 * Create array of L.LatLng objects from line produced by arc.js
 * @param {object} line
 * @param {L.LatLng} from
 * @private
 * @returns {Array}
 */
function _createLatLngs(line, from) {
    if (
        line.geometries[0] &&
        line.geometries[0].coords[0]
    ) {
        /**
         * stores how many times arc is broken over 180 longitude
         * @type {number}
         */
        let wrap =
            from.lng -
            line.geometries[0].coords[0][0] -
            360;

        return line.geometries
            .map((subLine) => {
                wrap += 360;
                return subLine.coords.map(
                    (point) =>
                        new LatLng([
                            point[1],
                            point[0] + wrap,
                        ])
                );
            })
            .reduce((all, latlngs) =>
                all.concat(latlngs)
            );
    } else {
        return [];
    }
}

const getCoords = (route) => {
    let start = {
        x: parseFloat(route.departure.airport.lon),
        y: parseFloat(route.departure.airport.lat),
    };
    let end = {
        x: parseFloat(route.arrival.airport.lon),
        y: parseFloat(route.arrival.airport.lat),
    };
    let generator = new GreatCircle(start, end);
    let line = generator.Arc(5);
    let latlngs = _createLatLngs(
        line,
        new LatLng(start.y, start.x)
    );
    return latlngs;
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
        MapElement(getCoords(route)),
        h1(
            "Route ",
            route.departure.airport.code,
            " -> ",
            route.arrival.airport.code
        ),
        div(
            {
                class: "block w-full overflow-x-scroll",
            },
            Table(values)
        )
    );
}

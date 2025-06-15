// Route map visualisation
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
let { div } = van.tags;

const MapElement = (coords) => {
    const el = div({ class: "h-40", id: "map" });
    const map = new Map(el); // .setView([51.505, -15], 10);

    const tiles = new TileLayer(
        ALIDADE_SMOOTH_DARK_URL,
        ALIDADE_SMOOTH_DARK_SETTINGS
    ).addTo(map);

    // Route
    const color = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--lime-6");
    const polyline = new Polyline(coords, {
        color,
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
    let line = generator.Arc(route.points);
    let latlngs = _createLatLngs(
        line,
        new LatLng(start.y, start.x)
    );
    return latlngs;
};

export default function RouteMap(route) {
    return MapElement(getCoords(route));
}

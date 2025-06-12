import L, {
    Map,
    TileLayer,
    Marker,
    Circle,
    Polygon,
    Popup,
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
    const map = new Map(el).setView([51.505, -15], 1);

    const tiles = new TileLayer(
        ALIDADE_SMOOTH_DARK_URL,
        ALIDADE_SMOOTH_DARK_SETTINGS
    ).addTo(map);
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

export default function Route(id) {
    let values = [];
    for (let i = 0; i < 200; i++) {
        values.push(30.0 + i / 50);
    }
    return main(
        { class: "Route" },
        Fab(),
        MapElement(),
        h1("Route ", id),
        div(
            {
                class: "block w-full overflow-x-scroll",
            },
            Table(values)
        )
    );
}

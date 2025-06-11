import L, {
    Map,
    TileLayer,
    Marker,
    Circle,
    Polygon,
    Popup,
} from "./leaflet.js";
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
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
        {
            minZoom: 0,
            maxZoom: 20,
            attribution: "",
            ext: "png",
        }
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

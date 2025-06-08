import L, {
    Map,
    TileLayer,
    Marker,
    Circle,
    Polygon,
    Popup,
} from "./leaflet.js";

import van from "./van.js";
let { label, h2, h1, select, option, input, div } =
    van.tags;
let state = {
    d: van.state("2025-06-06"),
    t: van.state("00:00"),
};

let stamp = van.derive(
    () => state.d.val + "T" + state.t.val
);

let Airport = (name, place) => {
    return select(
        {
            id: name,
            name,
            onchange: (ev) => {
                place.val = ev.target.value;
            },
        },
        option(
            {
                value: "lhr",
                selected: place.val == "lhr",
            },
            "London Heathrow"
        ),
        option(
            {
                value: "cdg",
                selected: place.val == "cdg",
            },
            "Paris (CDG)"
        )
    );
};

let origin = van.state("lhr");
let destination = van.state("cdg");

const el = div({ id: "map" });
const map = new Map(el).setView([51.505, -15], 1);
let marker = new Marker([51.5, 0]).addTo(map);
van.derive(() => {
    if (origin.val === "lhr") {
        marker.remove();
        marker = new Marker([51.5, 0]).addTo(map);
    } else {
        marker.remove();
        marker = new Marker([48.5, 0]).addTo(map);
    }
});

const tiles = new TileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
).addTo(map);

van.add(document.body, [
    el,
    div(
        { id: "control" },
        h1(origin, " -> ", destination),
        Airport("origin", origin),
        Airport("destination", destination),
        h2("Depart"),
        label({ for: "dep-date" }, "Date"),
        input({
            type: "date",
            name: "dep-date",
            id: "dep-date",
            value: state.d.val,
            onchange: (ev) => {
                state.d.val = ev.target.value;
            },
        }),
        label({ for: "dep-time" }, "Time"),
        input({
            type: "time",
            name: "dep-time",
            id: "dep-time",
            value: state.t.val,
            onchange: (ev) => {
                state.t.val = ev.target.value;
            },
        })
    ),
]);

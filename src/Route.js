import RouteMap from "./RouteMap.js"
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


const Fab = () => {
    return button(
        {
            class: "Fab absolute top-0 right-0 mie-4 mbs-4",
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
    for (let i = 0; i < route.points; i++) {
        values.push(30.0 + i / 50);
    }
    return main(
        { class: "Route" },
        Fab(),
        RouteMap(route),
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

import "./vendor/plotly-3.0.1.min.js";
import RouteMap from "./RouteMap.js";
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
    const color = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--lime-6");
    const gridcolor = getComputedStyle(
        document.documentElement
    ).getPropertyValue("--gray-6");
    setTimeout(() =>
        Plotly.newPlot(
            "myDiv",
            [
                {
                    x: [
                        "2013-10-04 22:23:00",
                        "2013-10-04 23:23:00",
                        "2013-10-05 00:23:00",
                        "2013-10-05 01:23:00",
                        "2013-10-05 02:23:00",
                        "2013-10-05 03:23:00",
                        "2013-10-05 04:23:00",
                        "2013-10-05 05:23:00",
                    ],
                    y: [10, 9, 11, 8, 12, 7, 13, 6],
                    type: "scatter",
                    marker: {
                        color,
                    },
                },
            ],
            {
                margin: {
                    l: 45,
                    r: 35,
                    t: 40,
                    b: 40,
                    pad: 10,
                },
                paper_bgcolor: "transparent",
                plot_bgcolor: "transparent",
                xaxis: {
                    color,
                    gridcolor,
                },
                yaxis: {
                    color,
                    gridcolor,
                    title: {
                        text: "°C",
                    },
                },
                title: {
                    font: {
                        color,
                    },
                    text: "Air temperature",
                },
            },
            {
                staticPlot: true,
                displayModeBar: false,
            }
        )
    );
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
        div({ id: "myDiv", class: "h-30" }),
        div(
            {
                class: "block w-full overflow-x-scroll",
            },
            Table(values)
        )
    );
}

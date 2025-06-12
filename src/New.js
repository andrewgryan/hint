import van from "./van.js";
let {
    button,
    div,
    h1,
    h2,
    header,
    input,
    label,
    main,
    option,
    section,
    select,
} = van.tags;
import { AIRPORTS } from "./airports.js";

const setResponse = (route) => (response) => {
    route.response = response;
    return route;
};

const toJSON = (route) => {
    return {
        departure: {
            airportId: route.departure.airportId.val,
            date: route.departure.date.val,
            time: route.departure.time.val,
        },
        arrival: {
            airportId: route.arrival.airportId.val,
            date: route.arrival.date.val,
            time: route.arrival.time.val,
        },
        flightLevel: route.flightLevel.val,
        points: route.points.val,
        id: route.id,
	response: route.response
    };
};

const setRouteId = (route) => {
    let routes = localStorage.getItem("routes");
    if (routes === null) {
        route.id = 0;
    } else {
        let ids = JSON.parse(routes)
            .filter((r) => r.id !== null)
            .map((r) => r.id);
        if (ids.length === 0) {
            route.id = 0;
        } else {
            route.id = Math.max(...ids) + 1;
        }
    }
    return route;
};

const storeRoute = (route) => {
    let routes = [];
    let value = localStorage.getItem("routes");
    if (value !== null) {
        routes = JSON.parse(value);
    }
    routes.push(route);
    localStorage.setItem(
        "routes",
        JSON.stringify(routes)
    );
    return route;
};

const redirectToRoute = (route) => {
    window.location.href = `/route/${route.id}`;
    return route;
};

export default function New() {
    let airports = AIRPORTS;
    let date = new Date().toISOString().split("T")[0];
    let time = new Date()
        .toISOString()
        .split("T")[1]
        .split(".")[0];
    let route = {
        departure: {
            airportId: van.state("jfk"),
            date: van.state(date),
            time: van.state(time),
        },
        arrival: {
            airportId: van.state("jfk"),
            date: van.state(date),
            time: van.state(time),
        },
        flightLevel: van.state(1000),
        points: van.state(2),
        id: null,
        response: null,
    };
    alert(JSON.stringify(toJSON(route)));
    return main(
        { class: "New" },
        h1("New route"),
        section(
            header(h2("Depart")),
            div(
                label("Airport"),
                select(
                    {
                        onchange: (ev) => {
                            route.departure.airportId.val =
                                ev.target.value;
                        },
                    },
                    airports.map((airport) =>
                        option(
                            {
                                value: airport.id,
                                selected:
                                    airport.id ===
                                    route.departure
                                        .airportId.val,
                            },
                            airport.name
                        )
                    )
                )
            ),
            div(
                { class: "grid col-2 gap-2" },
                div(
                    label("Date"),
                    input({
                        type: "date",
                        value: route.departure.date,
                        onchange: (ev) => {
                            route.departure.date.val =
                                ev.target.value;
                        },
                    })
                ),
                div(
                    label("Time"),
                    input({
                        type: "time",
                        value: route.departure.time
                            .val,
                        onchange: (ev) => {
                            route.departure.time.val =
                                ev.target.value;
                        },
                    })
                )
            )
        ),
        section(
            header(h2("Arrive")),
            div(
                label("Airport"),
                select(
                    {
                        onchange: (ev) => {
                            route.arrival.airportId.val =
                                ev.target.value;
                        },
                    },
                    airports.map((airport) =>
                        option(
                            {
                                value: airport.id,
                                selected:
                                    airport.id ===
                                    route.arrival
                                        .airportId.val,
                            },
                            airport.name
                        )
                    )
                )
            ),
            div(
                { class: "grid col-2 gap-2" },
                div(
                    label("Date"),
                    input({
                        type: "date",
                        value: route.arrival.date,
                        onchange: (ev) => {
                            route.arrival.date.val =
                                ev.target.value;
                        },
                    })
                ),
                div(
                    label("Time"),
                    input({
                        type: "time",
                        value: route.arrival.time.val,
                        onchange: (ev) => {
                            route.arrival.time.val =
                                ev.target.value;
                        },
                    })
                )
            )
        ),
        section(
            header(h2("Details")),
            div(
                label("Flight level"),
                input({
                    type: "number",
                    value: route.flightLevel.val,
                    onchange: (ev) => {
                        route.flightLevel.val =
                            ev.target.value;
                    },
                })
            ),
            div(
                label("Number of points"),
                input({
                    type: "number",
                    value: route.points.val,
                    min: 2,
                    max: 200,
                    step: 1,
                    onchange: (ev) => {
                        route.points.val =
                            ev.target.value;
                    },
                })
            )
        ),
        button(
            {
                onclick: () => {
                    window.location.href = "/route/0";
                },
            },
            "Create route"
        )
    );
}

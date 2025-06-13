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
            airport: route.departure.airport.val,
            date: route.departure.date.val,
            time: route.departure.time.val,
        },
        arrival: {
            airport: route.arrival.airport.val,
            date: route.arrival.date.val,
            time: route.arrival.time.val,
        },
        flightLevel: route.flightLevel.val,
        points: route.points.val,
        id: route.id,
        response: route.response,
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

const findAirport = (code) => {
    return AIRPORTS.find((a) => a.code === code);
};

export default function New() {
    let date = new Date().toISOString().split("T")[0];
    let time = new Date()
        .toISOString()
        .split("T")[1]
        .split(".")[0];
    let codes = {
        departure: van.state("SFO"),
        arrival: van.state("LHR"),
    };
    let route = {
        departure: {
            airport: van.derive(() =>
                findAirport(codes.departure.val)
            ),
            date: van.state(date),
            time: van.state(time),
        },
        arrival: {
            airport: van.derive(() =>
                findAirport(codes.arrival.val)
            ),
            date: van.state(date),
            time: van.state(time),
        },
        flightLevel: van.state(1000),
        points: van.state(2),
        id: null,
        response: null,
    };
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
                            codes.departure.val =
                                ev.target.value;
                        },
                    },
                    AIRPORTS.map((airport) =>
                        option(
                            {
                                value: airport.code,
                                selected:
                                    airport.code ===
                                    codes.departure
                                        .val,
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
                            codes.arrival.val =
                                ev.target.value;
                        },
                    },
                    AIRPORTS.map((airport) =>
                        option(
                            {
                                value: airport.code,
                                selected:
                                    airport.code ===
                                    codes.arrival.val,
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
                    let savedRoute = toJSON(route);
                    fetch("/static/api.json")
                        .then((response) =>
                            response.json()
                        )
                        .then(setResponse(savedRoute))
                        .then(setRouteId)
                        .then(storeRoute)
                        .then(redirectToRoute);
                },
            },
            "Create route"
        )
    );
}

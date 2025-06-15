import RouteMap from "./RouteMap.js";
import van from "./van.js";
let { a, h1, h2, header, main, div, button } =
    van.tags;

export default function Index() {
    let routes = JSON.parse(
        localStorage.getItem("routes") || "[]"
    );
    let cards = routes.map((route) => {
        return a(
            { href: `/route/${route.id}` },
            div(
                { class: "RouteSummary" },
                header(
                    { class: "grid col-2 gap-2" },
                    div(
                        h2(
                            route.departure.airport
                                .code
                        ),
                        div(route.departure.date),
                        div(route.departure.time)
                    ),
                    div(
                        h2(route.arrival.airport.code),
                        div(route.arrival.date),
                        div(route.arrival.time)
                    )
                ),
                RouteMap(route)
            )
        );
    });
    return main(
        { class: "Index" },
        h1("Routes"),
        div({ class: "RouteList" }, cards),
        button(
            {
                class: "Fab fixed bottom-0 center mbe-4",
                onclick: () => {
                    window.location.href = "/new";
                },
            },
            "+"
        )
    );
}

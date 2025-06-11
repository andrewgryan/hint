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

export default function New() {
    let airports = [
        { id: "lhr", name: "London Heathrow" },
        { id: "cdg", name: "Paris CDG" },
        { id: "jfk", name: "New York JFK" },
    ];
    return main(
        { class: "New" },
        h1("New route"),
        section(
            header(h2("Depart")),
            div(
                label("Airport"),
                select(
                    {},
                    airports.map((airport) =>
                        option(
                            {
                                value: airport.id,
                                selected:
                                    airport.id ===
                                    "jfk",
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
                        value: new Date()
                            .toISOString()
                            .split("T")[0],
                    })
                ),
                div(
                    label("Time"),
                    input({
                        type: "time",
                        value: new Date()
                            .toISOString()
                            .split("T")[1]
                            .split(".")[0],
                    })
                )
            )
        ),
        section(
            header(h2("Arrive")),
            div(
                label("Airport"),
                select(
                    {},
                    airports.map((airport) =>
                        option(
                            {
                                value: airport.id,
                                selected:
                                    airport.id ===
                                    "cdg",
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
                        value: new Date()
                            .toISOString()
                            .split("T")[0],
                    })
                ),
                div(
                    label("Time"),
                    input({
                        type: "time",
                        value: new Date()
                            .toISOString()
                            .split("T")[1]
                            .split(".")[0],
                    })
                )
            )
        ),
        section(
            header(h2("Details")),
            div(
                label("Flight level"),
                input({ type: "number", value: 150 })
            ),
            div(
                label("Number of points"),
                input({
                    type: "number",
                    value: 150,
                    min: 2,
                    max: 200,
                    step: 1,
                })
            )
        ),
        button(
            {
                onclick: () => {
                    window.location.href = "/route/0";
                },
            },
            "Submit"
        )
    );
}

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
    return main(
        { class: "New" },
        h1("New route"),
        section(
            header(h2("Depart")),
            div(
                label("Airport"),
                select(
                    { selected: "lhr" },
                    option(
                        { value: "lhr" },
                        "London Heathrow"
                    ),
                    option(
                        { value: "cdg" },
                        "Paris CDG"
                    ),
                    option(
                        { value: "jfk" },
                        "New York"
                    )
                )
            ),
            div(
                label("Date"),
                input({ type: "date" })
            ),
            div(label("Time"), input({ type: "time" }))
        ),
        section(
            header(h2("Arrive")),
            div(
                label("Airport"),
                select(
                    { selected: "cdg" },
                    option(
                        { value: "lhr" },
                        "London Heathrow"
                    ),
                    option(
                        { value: "cdg" },
                        "Paris CDG"
                    ),
                    option(
                        { value: "jfk" },
                        "New York"
                    )
                )
            ),
            div(
                label("Date"),
                input({ type: "date" })
            ),
            div(label("Time"), input({ type: "time" }))
        ),
        section(
            header(h2("Details")),
            div(
                label("Flight level"),
                input({ type: "number", value: 150 })
            ),
            div(
                label("Number of points"),
                input({ type: "number", value: 150 })
            )
        ),
        button({}, "Submit")
    );
}

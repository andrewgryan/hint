import van from "./van.js";
let { h1, main, div, button } = van.tags;

export default function Index() {
    return main(
        { class: "index" },
        h1("Index"),
        button("New Route"),
        button("All Routes"),
    );
}

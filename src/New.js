import van from "./van.js";
let { h1 } = van.tags;

export default function New(id) {
    return h1("New ", id, "!");
};

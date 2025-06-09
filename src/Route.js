import van from "./van.js";
let { h1 } = van.tags;

export default function Route(id) {
    return h1("Route ", id, "!");
};

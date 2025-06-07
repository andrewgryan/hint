let depart = {
	date: "2025-06-06",
	time: "18:11",
};
document.getElementById("depart-date").addEventListener("change", (ev) => {
	depart.date = ev.target.value;
	alert(JSON.stringify(depart));
});
import van from "./van.js";
let { h2, input, div } = van.tags;
let state = { d: van.state("Van"), t: van.state("") };

let stamp = van.derive(() => state.d.val + "T" + state.t.val);
van.add(
	document.body,
	div(
		h2("Hello, ", stamp, "!"),
		input({
			type: "date",
			name: "dep-date",
			id: "dep-date",
			onchange: (ev) => {
				state.d.val = ev.target.value;
			},
		}),
		input({
			type: "time",
			name: "dep-time",
			id: "dep-time",
			onchange: (ev) => {
				state.t.val = ev.target.value;
			},
		})
	)
);

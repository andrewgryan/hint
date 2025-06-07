import van from "./van.js";
let { h2, h1, select, option, input, div } = van.tags;
let state = { d: van.state("Van"), t: van.state("") };

let stamp = van.derive(() => state.d.val + "T" + state.t.val);

/**
<h1>Hello, World!</h1>
<div class="col-2">
	<select id="origin" name="origin">
		<option value="lhr">London Heathrow</option>
		<option value="cdg">Paris (CDG)</option>
	</select>
	<select id="destination" name="destination">
		<option value="lhr">London Heathrow</option>
		<option value="cdg">Paris (CDG)</option>
	</select>
	<input id="depart-date" type="date" name="" />
	<input id="depart-time" type="time" name="" />
	<input id="arrive-date" type="date" name="" />
	<input id="arrive-time" type="time" name="" />
</div>
*/

let Airport = (name) => {
	return select(
		{ id: name, name },
		option({ value: "lhr" }, "London Heathrow"),
		option({ value: "cdg" }, "Paris (CDG)")
	);
};

van.add(document.body, [
	h1("Hello, ", stamp, "!"),
	div(
		{ class: "col-2" },
		Airport("origin"),
		Airport("destination"),
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
	),
]);

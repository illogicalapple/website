// EXAMPLE compress({frames: [["DOWN", "UP"]]})
export function compress(data) {
	const destroy = parseInt(data.destroy) || 50;
	const version = 1;
	const title = data.title || "untitled";
	const frames = data.frames;
	if(!/^[a-zA-Z0-9_-\s]*$/.test(title)) throw new Error("must only have letters, numbers, underscores, dashes, and spaces");
	var stuff = `${title}:${destroy.toString(36)}V${version}`;
	data.frames.forEach(drawing => {
		stuff += "\n";
		drawing.forEach(point => {
			if(point == "DOWN") stuff += "_;";
			else if(point == "UP") stuff += "^;";
			else {
				stuff += point[0].toString(36);
				stuff += ",";
				stuff += point[1].toString(36);
				stuff += ";";
			}
		});
	});
	return stuff;
}
export function decompress(data) {
	const body = data.split("\n");
	const head = body.splice(0, 1)[0];
	const titlehead = head.split(":");
	const title = titlehead.splice(0, 1)[0];
	const other = titlehead[0].split("V");
	const destroy = parseInt(other.splice(0, 1)[0]), 36);
	const version = parseInt(other[0]);
	switch(version) {
		case 1:
			const frames = body.split("\n").map(e => {
				return e.split(";").map(e => {
					if(e.includes(",")) return e.split(",").map(e => parseInt(e, 36));
					return e == "^" ? "UP" : "DOWN";
				});
			});
			return { title, destroy, frames };
			break;
	}
}

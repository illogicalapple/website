addEventListener("load", function() {
	document.querySelector("nav#navigation a.option.stuff-option").addEventListener("click", function() {
		let menu = document.querySelector("#navigation div.menu");
		if(menu.hasAttribute("data-open")) {
			menu.removeAttribute("data-open");
			this.classList.remove("active");
		} else {
			menu.setAttribute("data-open", "bob");
			this.classList.add("active");
		}
		// BOBbBbB
	});
});

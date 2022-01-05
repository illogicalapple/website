addEventListener("load", function() {
	if(localStorage.darkMode === "true") {
		document.body.setAttribute("data-dark-mode", "");
		document.querySelector(".darkModeToggle").setAttribute("src", "/sun.svg");
	}
	document.querySelector("nav#navigation img").addEventListener("click", function() {
		if(this.getAttribute("src") === "/menu.svg") {
			this.src = "/close.svg";
			document.querySelector("nav#navigation div.menu").style.display = "";
		} else {
			this.src = "/menu.svg";
			document.querySelector("nav#navigation div.menu").style.display = "none";
		}
	});
});

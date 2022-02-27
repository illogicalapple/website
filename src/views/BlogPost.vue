<template>
	<main id="content" style="overflow-y: auto;">
		<iframe @load="injectStyles($event.target)" style="border: none; box-shadow: none; width: 100vw; height: calc(var(--height) - 85px); top: 0px; left: 0px; position: absolute;" :src="'https://illogicalapple.github.io/blogio?name=' + window.encodeURIComponent(postName)"></iframe>
	</main>
</template>
<script setup>
	import { marked } from "marked"
	import { ref, onMounted } from "vue"
	const postName = window.location.pathname.substring(6);
	const found = ref(true);
	const postData = ref({
		title: "not found",
		desc: "not found",
		author: "not found",
		created: "not found"
	});
	const post = ref("<h1>hello</h1>");
	const injectStyles = function inject(frame) {
		/*const content = frame.contentDocument;
		const styles = content.createElement("style");
		styles.innerHTML = `
			pre code.hljs {
				border-radius: 5px;
				font-family: "Source Code Pro", monospace;
			}
			.md {
				font-family: Lato, sans-serif;
			}
			body {
				margin: 40px !important;
			}
		`
		content.head.append(styles);*/
		console.warn("styles not injected")
	}
	function setTitle(event) {
		let allowed = [
			"https://illogicalapple.github.io",
			"https://illogicalapple.com"
		];
		if(!allowed.includes(event.origin)) return;
		document.title = event.data.title;
	}
	onMounted();
</script>

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
		const content = frame.contentDocument;
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
		content.head.append(styles);
	}
	/* onMounted(async function() {
		try {
			const asdf = await fetch("/blog/entries.json").then(r => r.json());
			postData.value = asdf.find(e => e.file == postName);
			document.title = postData.value.title;
			const el = document.createElement("meta");
			el.setAttribute("name", "description");
			el.setAttribute("content", postData.value.desc);
			document.head.appendChild(el);
			const el2 = document.createElement("meta");
			el2.setAttribute("name", "author");
			el2.setAttribute("content", postData.value.author);
			document.head.appendChild(el2);
			if(postData.value == undefined) {
				found.value = false;
			}
			if(found.value) {
				const hjkl = await fetch(`/blog/${postName}.md`).then(e => e.text());
				post.value = marked.parse(hjkl);
			} else {
				document.title = "404: not found";
				const el = document.createElement("meta");
				el.setAttribute("name", "robots");
				el.setAttribute("content", "noindex");
				document.head.appendChild(el);
				this.$router.push("/not-found?from=blog");
			}
		} catch(error) {
			window.alert(error.message);
		}
	}); */
</script>

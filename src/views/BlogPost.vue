<template>
	<main id="content" style="overflow-y: auto;">
		<iframe :src="'https://illogicalapple.github.io/blogio?name=' + window.encodeURIComponent(postName)"></iframe>
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

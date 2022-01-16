<template>
	<main id="content" style="overflow-y: auto;" v-if="found.value">
		<article id="article">
			<header id="header-main">
				<h1 class="title">{{ postData.value.title }}</h1>
				<p class="description">{{ postData.value.desc }}</p>
				<span class="author">By {{ postData.value.author }}</span> &bull;
				<span class="date">{{ postData.value.created }}</span>
			</header>
			<div id="article-text" v-html="post"></div>
		</article>
	</main>
	<NopeNothingHere v-else></NopeNothingHere>
</template>
<script setup>
	import NopeNothingHere from "./NopeNothingHere.vue"
	import { marked } from "marked"
	import { ref, onMounted } from "vue"
	const postName = window.location.pathname.substring(6);
	const found = ref(true);
	const postData = ref([]);
	fetch("/blog/entries.json").then(r => r.json()).then(r => {
		postData.value = r.find(e => e.file == postName);
		document.title = postData.value.title;
		const el = document.createElement("meta");
		el.setAttribute("name", "description");
		el.setAttribute("content", postData.value.desc);
		document.head.appendChild(el);
		const el2 = document.createElement("meta");
		el2.setAttribute("name", "author");
		el2.setAttribute("content", postData.value.author);
		document.head.appendChild(el2);
		found.value = postData.value != undefined;
	});
	const post = ref("");
	if(found.value) {
		fetch(`/blog/${postName}.md`).then(e => e.text()).then(r => post.value = marked.parse(r));
	} else {
		document.title = "404: not found";
		const el = document.createElement("meta");
		el.setAttribute("name", "robots");
		el.setAttribute("content", "noindex");
		document.head.appendChild(el);
	}
</script>

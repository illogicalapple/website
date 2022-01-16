<template>
	<main id="content" style="overflow-y: auto;" v-if="found.value">
		<article id="article">
			<header id="header-main">
				<h1 class="title">{{ postData.title }}</h1>
				<p class="description">{{ postData.desc }}</p>
				<span class="author">By {{ postData.author }}</span> &bull;
				<span class="date">{{ postData.created }}</span>
			</header>
			<div id="article-text" v-html="parsedPost"></div>
		</article>
	</main>
	<NopeNothingHere v-else></NopeNothingHere>
</template>
<script setup>
	import NopeNothingHere from "./NopeNothingHere.vue"
	import { marked } from "marked"
	import { ref, onMounted } from "vue"
	const found = ref(true);
	const __postData = await fetch("/blog/entries.json");
	const _postData = await __postData.json();
	const postData = _postData.find(e => e.file == globalThis.$route.params.postName);
	onMounted(() => {
		document.title = postData.title;
		const el = document.createElement("meta");
		el.setAttribute("name", "description");
		el.setAttribute("content", postData.desc);
		document.head.appendChild(el);
		const el2 = document.createElement("meta");
		el2.setAttribute("name", "author");
		el2.setAttribute("content", postData.author);
		document.head.appendChild(el2);
	});
	found.value = Boolean(postData);
	const _post = await fetch(`/blog/${globalThis.$route.params.postName}.md`);
	const post = await _post.text();
	const parsedPost = marked.parse(post);
</script>

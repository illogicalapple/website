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
	import { ref } from "vue"
	const found == ref(true);
	const _postData = await fetch("/blog/entries.json").json();
	const postData = _postData.find(e => e.file == this.$route.params.postName);
	found.value = Boolean(postData);
	const post = await fetch(`/blog/${this.$route.params.postName}.md`).text();
	const parsedPost = marked.parse(post);
</script>

<template>
	<main id="content">
		<div class="blog blog-container">
			<h1 class="blog blog-title">blog</h1>
			<div class="blog posts">
				<div class="blog post" v-for="post in posts">
					<h2 :data-title="post.title" class="blog blog-post title" :data-transparent="!posts">{{ post.title }}</h2>
					<p class="blog blog-post desc" :data-transparent="!posts">{{ post.desc }}</p>
					<span class="blog blog-post creator" :data-transparent="!posts">By {{ post.author }}</span> &bull;
					<span class="blog blog-post date" :data-transparent="!posts">{{ post.created }}</span>
				</div>
			</div>
		</div>
	</main>
</template>
<script setup>
	const _posts = await fetch("../blog/entries.json").then(response => response.json());
	const posts = _posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()); // newest to oldest
</script>
<style scoped>
	.blog-post[data-transparent="true"] {
		background-color: lightgray;
		border-radius: 5px;
		color: transparent;
	}
	.blog-container {
		top: calc(var(--height) / 4);
		left: 50%;
		position: absolute;
		transform: translateX(-50%);
	}
	.blog.blog-container h1 {
		font-size: 4em;
	}
	.blog.blog-container h2 {
		font-size: 2em;
	}
</style>

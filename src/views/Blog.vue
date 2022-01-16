<template>
	<main id="content" style="text-align: center;">
		<div class="blog blog-container">
			<h1 class="blog blog-title">
				<span>blog</span>
			</h1>
			<div class="blog posts">
				<router-link class="blog post" v-for="post in posts" :to="'/blog/' + post.file" style="display: inline-block; text-decoration: none;">
					<h2 :data-title="post.title" class="blog blog-post title" :data-transparent="!posts">
						<span>{{ post.title }}</span>
					</h2>
					<p class="blog blog-post desc" :data-transparent="!posts">{{ post.desc }}</p>
					<span class="blog blog-post creator" :data-transparent="!posts">By {{ post.author }}</span> &bull;
					<span class="blog blog-post date" :data-transparent="!posts">{{ post.created }}</span>
				</router-link>
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
	.blog.post {
		text-align: left;
		width: calc(100vw - 80px);
		border: 1px solid lightgray;
		padding: 40px;
		position: relative;
		top: 40px;
	}
	.blog.post:hover h2 span::after, .blog.blog-title span::after {
		content: "";
		display: block;
		margin: auto;
		margin-top: -0.65em;
		height: 0.5em;
		background-color: #007fff;
		width: calc(100% - 30px);
		position: absolute;
		left: 15px;
		z-index: -1;
	}
	main#content .blog.blog-title span::after {
		width: calc(100% - 60px);
		left: 30px;
	}
	.blog.post h2 span::after {
		transition: 0.3s;
		transition-property: width;
		width: 0px;
		content: "";
		display: block;
		margin: auto;
		margin-top: -0.65em;
		height: 0.5em;
		background-color: #007fff;
		left: 15px;
		z-index: -1;
		position: absolute;
	}
	h1 span, h2 span {
		position: relative;
	}
</style>

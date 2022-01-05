<template>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="icon" href="/apple.png">
	<link rel="stylesheet" href="/styles.css">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
	<script src="/stuff.js"></script>
	<meta charset="UTF-8">
	<meta name="author" content="illogicalapple">
	<meta name="description" content="{{ description }}">
	<title>{{ title }}</title>
</template>

<script setup>
import defineProps from "vue";
defineProps({
	title: String,
	description: String
});
</script>

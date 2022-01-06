<template>
	<link rel="icon" href="/apple.png">
	<link rel="stylesheet" href="/styles.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville&family=PT+Sans&family=Poppins:wght@600&family=Source+Code+Pro&display=swap" rel="stylesheet">
</template>

<script setup>
import defineProps from "vue";
defineProps({
	title: String,
	description: String
});
</script>

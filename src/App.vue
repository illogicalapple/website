<template>
	<Navbar></Navbar>
	<router-view />
</template>
<script setup>
	import { ref, onMounted, onBeforeUnmount } from "vue";
	import Navbar from "./components/Navbar.vue";
	const onResize = function onResize(event) {
		event.target.document.body.style.setProperty("--height", event.target.innerHeight + "px")
	}
	const interval = ref(0);
	onMounted(() => {
		onResize();
		interval.value = setInterval(onResize, 500);
		window.addEventListener("resize", onResize);
		window.addEventListener("load", onResize);
	});
	onBeforeUnmount(() => {
		window.removeEventListener("resize", onResize);
		window.removeEventListener("load", onResize);
	});
</script>

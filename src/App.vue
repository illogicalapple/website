<template>
	<Navbar></Navbar>
	<router-view />
</template>
<script setup>
	import { ref } from "vue";
	import Navbar from "./components/Navbar.vue";
	const onResize = function onResize(event) {
		event.target.document.body.style.setProperty("--height", event.target.innerHeight)
	}
	mounted() {
		window.addEventListener("resize", this.onResize);
		window.addEventListener("load", this.onResize);
	}
	beforeDestroy() {
		window.removeEventListener("resize", this.onResize);
		window.removeEventListener("load", this.onResize);
	}
</script>

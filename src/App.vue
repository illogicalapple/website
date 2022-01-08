<template>
	<router-view />
</template>
<script setup>
	import { ref } from "vue";
	const menuOpen = ref(false);
	const toggleMenu = () => {
		menuOpen.value = !menuOpen.value;
		alert("test");
	};
</script>

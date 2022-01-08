<template>
	<router-view />
</template>
<script setup>
	import { ref } from "vue";
	export default {
		setup() {
			const menuOpen = ref(false);
			const toggleMenu = () => {
				menuOpen.value = !menuOpen.value;
			};
			return {
				menuOpen,
				toggleMenu
			}
		}
	};
</script>

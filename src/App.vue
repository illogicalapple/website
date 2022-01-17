<template>
	<Navbar></Navbar>
	<Suspense>
		<template #default>
			<router-view />
		</template>
		<template #fallback>
			loading... :P
		</template>
	</Suspense>
</template>
<script setup>
	import { ref, onMounted, onBeforeUnmount } from "vue";
	import Navbar from "./components/Navbar.vue";
	const onResize = function onResize(event) {
		event.target.document.body.style.setProperty("--height", event.target.innerHeight + "px")
	}
	const interval = ref(0);
	onMounted(() => {
		onResize({
			target: window
		});
		interval.value = setInterval(onResize, 500, {
			target: window
		});
		window.addEventListener("resize", onResize);
		window.addEventListener("load", onResize);
	});
	onBeforeUnmount(() => {
		window.removeEventListener("resize", onResize);
		window.removeEventListener("load", onResize);
	});
</script>

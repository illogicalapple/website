<template>
	<Navbar>
	<router-view />
</template>
<script setup>
	import { ref } from "vue";
	import Navbar from "./components/Navbar.vue";
</script>

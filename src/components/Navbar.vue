<template>
	<nav id="navigation" style="position: fixed; left: 0px; top: 0px; height: 85px; background-color: white; border-bottom: 1px solid lightgray;" class="full-width" >
		<div style="position: absolute; left: 10px; width: 50px;" class="relative-full-height">
			<a style="position: absolute; left: 0px; padding: 0px 20px; display: table;" class="relative-full-height title bold float-left option nope">
				<span style="display: table-cell; vertical-align: middle; text-align: center;">
					illogical<span class="blue" style="color: var(--secondary);">apple</span>
				</span>
			</a>
		</div>
		<div style="position: absolute; right: 10px; top: 0px;" class="relative-full-height">
			<a href="javascript:void(0)" style="display: table; padding: 0px 20px; cursor: pointer;" class="relative-full-height float-right option stuff-option" @click="toggleMenu" :class="{ 'active': menuOpen }">
				<span style="display: table-cell; vertical-align: middle; text-align: center;" class="{{ page == 'stuff' ? 'bold' : '' }}">
					stuff i made
				</span>
			</a>
			<router-link to="/" style="display: table; padding: 0px 20px;" class="relative-full-height float-right option home-option">
				<span style="display: table-cell; vertical-align: middle; text-align: center;" class="{{ page == 'home' ? 'bold' : '' }}">
					home
				</span>
			</router-link>
		</div>
		<img src="/menu.svg">
		<Menu></Menu>
	</nav>
</template>

<script setup>
import defineProps from "vue";
import Menu from "./Menu.vue";

defineProps({
	page: String
});
</script>

<style scoped>
	#navigation a > span {
		font-size: 21px;
		font-family: Poppins;
	}
</style>

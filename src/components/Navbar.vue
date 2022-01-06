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
			<a href="/my-stuff" style="display: table; padding: 0px 20px;" class="relative-full-height float-right option">
				<span style="display: table-cell; vertical-align: middle; text-align: center;" class="{{ page == 'stuff' ? 'bold' : '' }}">
					Stuff I made
				</span>
			</a>
			<a href="/" style="display: table; padding: 0px 20px;" class="relative-full-height float-right option home-option">
				<span style="display: table-cell; vertical-align: middle; text-align: center;" class="{{ page == 'home' ? 'bold' : '' }}">
					Home
				</span>
			</a>
		</div>
		<img src="/menu.svg">
		<div class="menu" style="display: none;">
			<a href="/">Home</a>
			<br> <a href="/my-stuff">Stuff I made</a>
		</div>
	</nav>
</template>

<script setup>
import defineProps from "vue";

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

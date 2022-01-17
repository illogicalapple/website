<template>
	<main id="content" style="--forty: calc(0.4 * var(--height));">
		<transition name="image-zoom">
			<img src="/apples-cropped.png" style="height: min(30vw, var(--forty)); top: 50%; position: absolute; transform: translateY(-50%); left: 15vw;">
		</transition>
		<div class="text" style="left: calc(30vw + min(30vw, var(--forty))); position: absolute; width: 25vw; top: 50%; transform: translateY(-50%);">
			<h1>
				<transition name="fade">
					hi, <span style="position: relative;">
						it's me.<transition name="underline"><span class="underline-blue"></span></transition>
					</span>
				</transition>
			</h1>
			<p style="font-size: 1.4em;">
				<span v-for="(item, index) in text" class="letter"><transition name="letters"><span :style="'transition-delay: ' + (index / 10) + 's'">{{ item }}</span></transition></span>
			</p>
		</div>
	</main>
</template> <!-- doesn't work -->
<style scoped>
	.image-zoom-enter-active,
	.image-zoom-leave-active,
	.letters-enter-active,
	.letters-leave-active,
	.fade-enter-active,
	.fade-leave-active,
	.underline-enter-active,
	.underline-leave-active {
		transition: 0.5s ease;
	}
	.image-zoom-enter-from {
		width: 0px !important;
		height: 0px !important;
	}
	.image-zoom-leave-to {
		height: calc(var(--forty)) !important;
		opacity: 0;
	}
	.letters-enter-from {
		top: 15px;
		opacity: 0;
	}
	.letters-leave-to {
		top: 100vh;
	}
	.letters-enter-active {
		position: relative;
	}
	span.underline-blue {
		content: "";
		display: block;
		margin: auto;
		margin-top: -0.65em;
		height: 0.5em;
		background-color: #007fff;
		width: min(calc(100% - 30px), var(--width));
		position: absolute;
		left: 15px;
		z-index: -1;
	}
	.underline-enter-from, .underline-leave-to {
		--width: 0px !important;
	}
	.fade-enter-from {
		opacity: 0;
	}
	.fade-leave-to {
		position: relative;
		left: 100vw;
	}
</style>
<script setup>
	const text = "vote apples over kumquats\nlet's go apples!".split("");
</script>

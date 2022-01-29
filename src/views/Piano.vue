<template>
	<main id="content">
		<div class="piano" style="height: 100%; text-align: center;">
			<div class="key-parent" v-for="key in keys.white" :style="key[0] == '_' ? blackParentStyle : ''">
				<div class="key-white" v-if="key[0] != '_'">
					{{ key[0] }}
				</div>
				<div class="key-black" v-else>
					{{ keys.black[key[1]].substring(0, 2) }}
				</div>
			</div>
		</div>
	</main>
</template>
<script setup>
	const keys = {
		white: [
			"C4",
			"_0",
			"D4",
			"_1",
			"E4",
			"F4",
			"_2",
			"G4",
			"_3",
			"A4",
			"_4",
			"B4"
		],
		black: [
			"C#4",
			"D#4",
			"F#4",
			"G#4",
			"A#4"
		]
	};
	const blackParentStyle = "position: absolute; transform: translate(-50%, calc(-25% + 0.5em)); z-index: 2000;";
</script>
<style scoped>
.key-white {
    display: inline-block;
    height: 100%;
    aspect-ratio: 1/6;
    padding-top: calc(((var(--height) - 85px) * 0.325));
    text-align: center;
    border: 1px solid lightgray;
}

.key-parent {
    display: inline-block;
    top: 50%;
    position: relative;
    transform: translateY(-50%);
    height: 50%;
}

.key-black {
    color: white;
    background-color: #333;
    height: 50%;
    aspect-ratio: 1/4;
    padding-top: calc((var(--height) / 8) - 1.5em);
    transform: translateY(calc(-50% - 0.5em));
}
</style>

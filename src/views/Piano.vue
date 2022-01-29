<template>
	<main id="content">
		<div class="piano">
			<div class="key-parent" v-for="key in keys.white">
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
	}
</script>
